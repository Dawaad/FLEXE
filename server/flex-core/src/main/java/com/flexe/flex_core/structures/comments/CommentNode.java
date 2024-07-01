package com.flexe.flex_core.structures.comments;

import com.flexe.flex_core.entity.posts.metrics.Comment;

public class CommentNode {
    private Comment comment;
    private CommentNode[] children;

    public CommentNode(Comment comment) {
        this.comment = comment;
    }

    public Comment getComment() {
        return comment;
    }

    public void setComment(Comment comment) {
        this.comment = comment;
    }

    public CommentNode[] getChildren() {
        return children;
    }

    public void setChildren(CommentNode[] children) {
        this.children = children;
    }
}

