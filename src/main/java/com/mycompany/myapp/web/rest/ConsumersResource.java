package com.mycompany.myapp.web.rest;

import com.codahale.metrics.annotation.Timed;
import com.mycompany.myapp.domain.Consumers;
import com.mycompany.myapp.repository.ConsumersRepository;
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
 * REST controller for managing Consumers.
 */
@RestController
@RequestMapping("/api")
public class ConsumersResource {

    private final Logger log = LoggerFactory.getLogger(ConsumersResource.class);

    private static final String ENTITY_NAME = "consumers";

    private final ConsumersRepository consumersRepository;

    public ConsumersResource(ConsumersRepository consumersRepository) {
        this.consumersRepository = consumersRepository;
    }

    /**
     * POST  /consumers : Create a new consumers.
     *
     * @param consumers the consumers to create
     * @return the ResponseEntity with status 201 (Created) and with body the new consumers, or with status 400 (Bad Request) if the consumers has already an ID
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PostMapping("/consumers")
    @Timed
    public ResponseEntity<Consumers> createConsumers(@Valid @RequestBody Consumers consumers) throws URISyntaxException {
        log.debug("REST request to save Consumers : {}", consumers);
        if (consumers.getId() != null) {
            throw new BadRequestAlertException("A new consumers cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Consumers result = consumersRepository.save(consumers);
        return ResponseEntity.created(new URI("/api/consumers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * PUT  /consumers : Updates an existing consumers.
     *
     * @param consumers the consumers to update
     * @return the ResponseEntity with status 200 (OK) and with body the updated consumers,
     * or with status 400 (Bad Request) if the consumers is not valid,
     * or with status 500 (Internal Server Error) if the consumers couldn't be updated
     * @throws URISyntaxException if the Location URI syntax is incorrect
     */
    @PutMapping("/consumers")
    @Timed
    public ResponseEntity<Consumers> updateConsumers(@Valid @RequestBody Consumers consumers) throws URISyntaxException {
        log.debug("REST request to update Consumers : {}", consumers);
        if (consumers.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Consumers result = consumersRepository.save(consumers);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(ENTITY_NAME, consumers.getId().toString()))
            .body(result);
    }

    /**
     * GET  /consumers : get all the consumers.
     *
     * @return the ResponseEntity with status 200 (OK) and the list of consumers in body
     */
    @GetMapping("/consumers")
    @Timed
    public List<Consumers> getAllConsumers() {
        log.debug("REST request to get all Consumers");
        return consumersRepository.findAll();
    }

    /**
     * GET  /consumers/:id : get the "id" consumers.
     *
     * @param id the id of the consumers to retrieve
     * @return the ResponseEntity with status 200 (OK) and with body the consumers, or with status 404 (Not Found)
     */
    @GetMapping("/consumers/{id}")
    @Timed
    public ResponseEntity<Consumers> getConsumers(@PathVariable Long id) {
        log.debug("REST request to get Consumers : {}", id);
        Optional<Consumers> consumers = consumersRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(consumers);
    }

    /**
     * DELETE  /consumers/:id : delete the "id" consumers.
     *
     * @param id the id of the consumers to delete
     * @return the ResponseEntity with status 200 (OK)
     */
    @DeleteMapping("/consumers/{id}")
    @Timed
    public ResponseEntity<Void> deleteConsumers(@PathVariable Long id) {
        log.debug("REST request to delete Consumers : {}", id);

        consumersRepository.deleteById(id);
        return ResponseEntity.ok().headers(HeaderUtil.createEntityDeletionAlert(ENTITY_NAME, id.toString())).build();
    }
}
