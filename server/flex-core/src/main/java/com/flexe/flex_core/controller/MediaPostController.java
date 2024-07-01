package com.flexe.flex_core.controller;

import com.flexe.flex_core.entity.posts.media.MediaPost;
import com.flexe.flex_core.service.posts.MediaPostService;
import io.sentry.Sentry;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
@RequestMapping("api/post/media")
public class MediaPostController {

    @Autowired
    private
    MediaPostService service;

    @PostMapping("/upload")
    @ResponseBody
    public ResponseEntity<MediaPost> savePost(@RequestBody MediaPost post) {
        try{
            MediaPost savedPost = service.savePost(post);
            if(savedPost == null){
                throw new ResponseStatusException(org.springframework.http.HttpStatus.BAD_REQUEST, "Post not saved");
            }
            return ResponseEntity.ok(savedPost);
        }
        catch (Exception e){
            Sentry.captureException(e);
           return null;
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<MediaPost> getUserPostFromID(@PathVariable String id) {

        MediaPost post =  service.getUserPostFromID(id);
        if(post == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Post not found");
        }
        return ResponseEntity.ok(post);
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<MediaPost[]> getAllPostFromUser(@PathVariable String userId) {

        MediaPost[] posts = service.getAllPostFromUser(userId);
        if(posts == null){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Posts not found");
        }

        return ResponseEntity.ok(posts);

    }

    @DeleteMapping("/delete/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable String postId) {
        try{
            service.deletePost(postId);
            return ResponseEntity.ok("Post deleted");
        }
        catch (Exception e){
            Sentry.captureException(e);
            return null;
        }
    }

}
