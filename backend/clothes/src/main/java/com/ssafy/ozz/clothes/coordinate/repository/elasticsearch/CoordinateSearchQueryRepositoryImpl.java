package com.ssafy.ozz.clothes.coordinate.repository.elasticsearch;

import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.FunctionBoostMode;
import co.elastic.clients.json.JsonData;
import com.ssafy.ozz.clothes.clothes.dto.request.VectorRequest;
import com.ssafy.ozz.clothes.clothes.dto.response.VectorResponse;
import com.ssafy.ozz.clothes.coordinate.domain.CoordinateDocument;
import com.ssafy.ozz.clothes.coordinate.dto.request.CoordinateSearchCondition;
import com.ssafy.ozz.library.clothes.properties.Style;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.client.elc.NativeQuery;
import org.springframework.data.elasticsearch.core.ElasticsearchOperations;
import org.springframework.data.elasticsearch.core.SearchHit;
import org.springframework.data.elasticsearch.core.SearchHits;
import org.springframework.data.elasticsearch.core.query.Query;
import org.springframework.web.reactive.function.client.WebClient;

import java.util.Collections;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

import static com.ssafy.ozz.library.util.EnumBitwiseConverter.toBits;

@RequiredArgsConstructor
public class CoordinateSearchQueryRepositoryImpl implements CoordinateSearchQueryRepository {

    private final ElasticsearchOperations operations;
    private final WebClient webClient;

    public float[] getVector(String text) {
        return Objects.requireNonNull(webClient.post()
                .uri("/vectorize")
                .bodyValue(VectorRequest.of(text))
                .retrieve()
                .bodyToMono(VectorResponse.class).block()).vector();
    }

    public Page<CoordinateDocument> findByCondition(CoordinateSearchCondition condition, Pageable pageable) {
//        Query query = createConditionNativeQuery(condition,pageable);
        Query query = createConditionNativeQuery(condition,pageable);

        SearchHits<CoordinateDocument> searchHits = operations.search(query, CoordinateDocument.class);

        List<CoordinateDocument> documents = searchHits
                .stream()
                .map(SearchHit::getContent)
                .collect(Collectors.toList());

        return new PageImpl<>(documents, pageable, searchHits.getTotalHits());
    }

    private Query createConditionNativeQuery(CoordinateSearchCondition condition, Pageable pageable) {
        return NativeQuery.builder()
                .withQuery(q->q
                    .scriptScore(s->s
                        .query(sq->sq.bool(sb->{
                            matchKeyword(sb, condition.keyword());
                            return sb;
                        }))
                        .script(ss->ss
                            .inline(si->si
                                .source("if ((doc['style'].value & params.style) != 0) return 1; else return 0;")
                                .params(Collections.singletonMap("style", JsonData.of((condition.styleList() == null || condition.styleList().isEmpty())
                                        ? ((1<<Style.values().length)-1)
                                        : toBits(condition.styleList()))))
                            )
                        )
                        .minScore(0.5f)
                    )
                )
                .withPageable(pageable) // Pagination
                .build();
    }

    private BoolQuery.Builder matchKeyword(BoolQuery.Builder b, String keyword) {
        if (keyword == null || keyword.isEmpty()) return b;
        b.must(m -> m
                .match(mm -> mm
                        .field("name")
                        .query(keyword)
                )
        )
        .should(s -> s
                .matchPhrase(mp -> mp
                        .field("name")
                        .query(keyword)
                )
        );

        String[] tokens = keyword.split("\\s+");
        for (String token : tokens) {
            b.should(s -> s
                    .term(t -> t
                            .field("name")
                            .value(token)
                    )
            );
        }
        return b;
    }

    private Query createSearchQuery(CoordinateSearchCondition condition, Pageable pageable) {
        float[] vector = getVector(condition.keyword());

        return NativeQuery.builder()
                .withQuery(q->q
                    .functionScore(f->f
                        .query(qq->qq
                            .bool(b->b
                                .filter(ff->ff
                                    .term(t->t
                                        .field("status")
                                        .value("published")
                                    )
                                )
                                // 무신사 검은 셔츠 검색시 '무신사' '검은' '셔츠'가 들어있는 document는 점수를 높힘
                                .should(bs->bs
                                    .match(mm->mm
                                        .field("name")
                                        .query(condition.keyword())
                                    )
                                )
                            )
                        )
                        .functions(ff->ff
                            // 무신사 검은 셔츠 검색시 '무신사 검은 셔츠'와 비슷한 vector를 가진 document의 score를 증가
                            .scriptScore(s -> s
                                .script(ss->ss
                                    .inline(si->si
                                        .source("cosineSimilarity(params.vector, 'vector') + 1.0")
                                        .params(Collections.singletonMap("vector", JsonData.of(vector)))
                                    )
                                )
                            )
                        )
                        .boostMode(FunctionBoostMode.Multiply)
                    )
                )
                .withPageable(pageable) // Pagination
                .build();
    }
}