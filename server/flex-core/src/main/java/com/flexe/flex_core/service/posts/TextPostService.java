package com.flexe.flex_core.service.posts;

import com.flexe.flex_core.entity.posts.text.TextPost;
import com.flexe.flex_core.repository.post.TextPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class TextPostService {

    @Autowired
    private TextPostRepository repository;

    public TextPost savePost(TextPost textPost) { return repository.save(textPost);}

    public TextPost getUserTextPostFromID(String id) { return repository.findById(id).orElse(null);}

    public TextPost[] getAllTextPostFromUser(String userId) {
        return repository.findAllTextPostByUserId(userId);
    }

    public void deletePost(String postId) {
        repository.deleteById(postId);
    }
}
