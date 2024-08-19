package com.ssafy.ozz.clothes.coordinate.domain;

import com.ssafy.ozz.clothes.global.es.Indices;
import lombok.*;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.*;

import java.time.LocalDateTime;

@Document(indexName = Indices.COORDINATE_INDEX)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@Getter
@Setting(settingPath = "elastic/elastic-settings.json", replicas = 0) // replicas는 운영시 변경
@ToString
public class CoordinateDocument {
    @Id
    private String id;

    @Field(name = "coordinate_id", type = FieldType.Long)
    private Long coordinateId;

    @Field(type = FieldType.Integer)
    private Integer style;

    @Field(type = FieldType.Text, searchAnalyzer = "korean_search", analyzer = "korean")
    private String name;

    @Field(name = "created_date",type = FieldType.Date, pattern = "yyyy-MM-dd'T'HH:mm:ss.SSSSSS'Z'")
    private LocalDateTime createdDate;

    /* FOREIGN KEY */
    @Field(name = "user_id", type = FieldType.Long)
    private Long userId;
    @Field(name = "image_file_id", type = FieldType.Long)
    private Long imageFileId;
}
