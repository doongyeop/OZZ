package com.ssafy.ozz.board.service;

import com.ssafy.ozz.board.domain.Board;
import com.ssafy.ozz.board.domain.Tag;
import com.ssafy.ozz.board.dto.request.BoardCreateRequest;
import com.ssafy.ozz.board.dto.request.BoardUpdateRequest;
import com.ssafy.ozz.board.dto.request.TagDto;
import com.ssafy.ozz.board.dto.response.BoardResponse;
import com.ssafy.ozz.board.dto.response.UserResponse;
import com.ssafy.ozz.board.global.feign.file.FileClient;
import com.ssafy.ozz.board.global.feign.user.UserClient;
import com.ssafy.ozz.board.repository.BoardRepository;
import com.ssafy.ozz.board.repository.TagRepository;
import com.ssafy.ozz.library.clothes.properties.Style;
import com.ssafy.ozz.library.file.FileInfo;
import com.ssafy.ozz.library.global.error.exception.BoardNotFoundException;
import com.ssafy.ozz.library.global.error.exception.FileNotFoundException;
import com.ssafy.ozz.library.global.error.exception.UserNotFoundException;
import com.ssafy.ozz.library.user.UserInfo;
import com.ssafy.ozz.library.util.EnumBitwiseConverter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class BoardServiceImpl implements BoardService {

    private final BoardRepository boardRepository;
    private final TagRepository tagRepository;
    private final UserClient userClient;
    private final FileClient fileClient;


    @Override
    public Board createBoard(Long userId, Long imgFileId, BoardCreateRequest request) {
        List<Style> styles = EnumBitwiseConverter.fromStrings(Style.class, request.styleList());

        Board board = Board.builder()
                .content(request.content())
                .imgFileId(imgFileId)
                .userId(userId)
                .age(request.age())
                .style(EnumBitwiseConverter.toBits(styles))
                .likes(0)
                .coordinateId(request.coordinateId())
                .createdDate(new Date())
                .build();

        boardRepository.save(board);

        // 태그 저장
        for (TagDto tag : request.tagList()) {
            Tag newTag = Tag.builder()
                    .board(board)
                    .clothesId(tag.clothesId())
                    .xPosition(tag.xPosition())
                    .yPosition(tag.yPosition())
                    .build();
            tagRepository.save(newTag);
        }

        return board;
    }

    @Override
    public Page<Board> getBoardsByUserId(Long userId, Pageable pageable) {
        return boardRepository.findByUserId(userId, pageable);
    }

    @Override
    public Page<Board> getBoards(Pageable pageable) {
        return boardRepository.findAll(pageable);
    }

    @Override
    public BoardResponse getBoard(Long boardId) {
        Board board = boardRepository.findById(boardId).orElseThrow(BoardNotFoundException::new);

        FileInfo boardImg = fileClient.getFile(board.getImgFileId()).orElseThrow(FileNotFoundException::new);
        UserInfo userInfo = userClient.getUserInfoFromId(board.getUserId()).orElseThrow(UserNotFoundException::new);
        FileInfo profileImg = fileClient.getFile(userInfo.profileFileId()).orElseThrow(FileNotFoundException::new);

        UserResponse userResponse = new UserResponse(
                userInfo.userId() == null ? null : userInfo.userId(),
                userInfo.nickname() == null ? null : userInfo.nickname(),
                userInfo.profileFileId() == null ? null : userInfo.profileFileId(),
                userInfo.Birth() == null ? null : userInfo.Birth(),
                profileImg
        );

        List<String> styleStrings = EnumBitwiseConverter.toEnums(Style.class, board.getStyle()).stream()
                .map(Enum::name)
                .collect(Collectors.toList());

        return new BoardResponse(
                board.getId(),
                board.getUserId(),
                board.getCoordinateId(),
                board.getContent(),
                board.getAge(),
                board.getLikes(),
                styleStrings,
                board.getTags(),
                boardImg,
                userResponse,
                board.getCreatedDate()
        );
    }

    @Override
    public void updateBoard(Long boardId, BoardUpdateRequest request, Long boardImg) {
        Board board = boardRepository.findById(boardId).orElseThrow(BoardNotFoundException::new);
        List<Style> styles = EnumBitwiseConverter.fromStrings(Style.class, request.styleList());

        board = board.toBuilder()
                .content(request.content())
                .imgFileId(boardImg)
                .coordinateId(request.coordinateId())
                .style(EnumBitwiseConverter.toBits(styles))
                .build();

        boardRepository.save(board);

        // 기존 태그 삭제 후 새로운 태그 저장
        tagRepository.deleteAllByBoard(board);
        for (TagDto tag : request.tagList()) {
            Tag newTag = Tag.builder()
                    .board(board)
                    .clothesId(tag.clothesId())
                    .xPosition(tag.xPosition())
                    .yPosition(tag.yPosition())
                    .build();
            tagRepository.save(newTag);
        }

    }

    @Override
    public void deleteBoard(Long boardId) {
        Board board = boardRepository.findById(boardId).orElseThrow(BoardNotFoundException::new);
        tagRepository.deleteAllByBoard(board);
        boardRepository.deleteById(boardId);
    }

    @Override
    public Page<Board> getBoardsByStyle(Pageable pageable, String style) {
        Style styleEnum = EnumBitwiseConverter.fromString(Style.class, style);
        Integer styleBit = EnumBitwiseConverter.toBit(styleEnum);

        return boardRepository.findByStyle(styleBit, pageable);
    }

    @Override
    public Page<Board> getBoardsByAgeRange(Pageable pageable, int startAge, int endAge) {
        return boardRepository.findByAgeBetween(startAge, endAge, pageable);
    }

    @Override
    public Page<Board> getBoardsSortedByLikesInOneDay(Pageable pageable) {
        Date oneDayAgo = new Date(System.currentTimeMillis() - 24 * 60 * 60 * 1000);
        return boardRepository.findByCreatedDateAfterOrderByLikesDesc(oneDayAgo, pageable);
    }
}

