package com.flexe.flex_core.service.posts;

import com.flexe.flex_core.entity.posts.media.MediaPost;
import com.flexe.flex_core.entity.posts.text.TextPost;
import com.flexe.flex_core.repository.post.MediaPostRepository;
import com.flexe.flex_core.repository.post.TextPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MediaPostService {

    @Autowired
    private
    MediaPostRepository repository;

    public MediaPost savePost(MediaPost post) {
        return repository.save(post);
    }

    public MediaPost getUserPostFromID(String id) {
        return repository.findById(id).orElse(null);
    }

    public MediaPost[] getAllPostFromUser(String userId) {
        return repository.findAllPostByUserId(userId);
    }
    public void deletePost(String postId) {
        repository.deleteById(postId);
    }
}
