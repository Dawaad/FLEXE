package com.flexe.flex_core.entity.posts.media;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Document(collection = "MediaPosts")
public class MediaPost {
    @Id
    private String id;
    private PostAuxData auxData;
    private PostExternalData externalData;
    private List<PostContent> document;

    public MediaPost() {
    }

    public MediaPost(String id, PostAuxData auxData, PostExternalData externalData, List<PostContent> document) {
        this.id = id;
        this.auxData = auxData;
        this.externalData = externalData;
        this.document = document;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public PostAuxData getAuxData() {
        return auxData;
    }

    public void setAuxData(PostAuxData auxData) {
        this.auxData = auxData;
    }

    public PostExternalData getExternalData() {
        return externalData;
    }

    public void setExternalData(PostExternalData externalData) {
        this.externalData = externalData;
    }

    public List<PostContent> getDocument() {
        return document;
    }

}