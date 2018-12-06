package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Posts;
import com.mycompany.myapp.repository.PostsRepository;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.web.rest.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing Posts.
 */
@RestController
@RequestMapping("/api")
public class PostsResource {

    private final Logger log = LoggerFactory.getLogger(PostsResource.class);

    private static final String ENTITY_NAME = "posts";

    private final PostsRepository postsRepository;

    public PostsResource(PostsRepository postsRepository) {
        this.postsRepository = postsRepository;
    }

    /**
     * POST  /posts : Create a new posts.
     *
     * @param posts the posts to create
     * @return the ResponseEntity with status 201 (Created) and with body the new posts, or with status 400 (Bad Request) if the posts has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/posts")
    @Timed
    public ResponseEntity<Posts> createPosts(@Valid @RequestBody Posts posts) throws URISyntaxException {
        log.debug("REST request to save Posts : {}", posts);
        if (posts.getId() != null) {
            throw new BadRequestAlertException("A new posts cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Posts result = postsRepository.save(posts);
        return ResponseEntity.created(new URI("/api/posts/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /posts : Updates an existing posts.
     *
     * @param posts the posts to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated posts,
     * or with status 400 (Bad Request) if the posts is not valid,
     * or with status 500 (Internal Server Error) if the posts couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/posts")
    @Timed
    public ResponseEntity<Posts> updatePosts(@Valid @RequestBody Posts posts) throws URISyntaxException {
        log.debug("REST request to update Posts : {}", posts);
        if (posts.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Posts result = postsRepository.save(posts);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, posts.getId().toString()))
            .body(result);
    }

    /**
     * GET  /posts : get all the posts.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of posts in body
     */
    @GetMapping("/posts")
    @Timed
    public List<Posts> getAllPosts() {
        log.debug("REST request to get all Posts");
        return postsRepository.findAll();
    }

    /**
     * GET  /posts/:id : get the "id" posts.
     *
     * @param id the id of the posts to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the posts, or with status 404 (Not Found)
     */
    @GetMapping("/posts/{id}")
    @Timed
    public ResponseEntity<Posts> getPosts(@PathVariable Long id) {
        log.debug("REST request to get Posts : {}", id);
        Optional<Posts> posts = postsRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(posts);
    }

    /**
     * DELETE  /posts/:id : delete the "id" posts.
     *
     * @param id the id of the posts to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/posts/{id}")
    @Timed
    public ResponseEntity<Void> deletePosts(@PathVariable Long id) {
        log.debug("REST request to delete Posts : {}", id);

        postsRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
