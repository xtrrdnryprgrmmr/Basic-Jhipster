package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.MixprojectApp;

import com.mycompany.myapp.domain.Consumers;
import com.mycompany.myapp.repository.ConsumersRepository;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import java.util.List;


import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Test class for the ConsumersResource REST controller.
 *
 * @see ConsumersResource
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = MixprojectApp.class)
public class ConsumersResourceIntTest {

    private static final String DEFAULT_NAME = "AAAAAAAAAA";
    private static final String UPDATED_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final Long DEFAULT_PHONE = 11L;
    private static final Long UPDATED_PHONE = 12L;

    private static final String DEFAULT_WEBSITES = "http://www~ZYmg8rcq.wd";
    private static final String UPDATED_WEBSITES = "https://www@Iaa8Pgom.";

    @Autowired
    private ConsumersRepository consumersRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    private MockMvc restConsumersMockMvc;

    private Consumers consumers;

    @Before
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ConsumersResource consumersResource = new ConsumersResource(consumersRepository);
        this.restConsumersMockMvc = MockMvcBuilders.standaloneSetup(consumersResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Consumers createEntity(EntityManager em) {
        Consumers consumers = new Consumers()
            .name(DEFAULT_NAME)
            .email(DEFAULT_EMAIL)
            .phone(DEFAULT_PHONE)
            .websites(DEFAULT_WEBSITES);
        return consumers;
    }

    @Before
    public void initTest() {
        consumers = createEntity(em);
    }

    @Test
    @Transactional
    public void createConsumers() throws Exception {
        int databaseSizeBeforeCreate = consumersRepository.findAll().size();

        // Create the Consumers
        restConsumersMockMvc.perform(post("/api/consumers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consumers)))
            .andExpect(status().isCreated());

        // Validate the Consumers in the database
        List<Consumers> consumersList = consumersRepository.findAll();
        assertThat(consumersList).hasSize(databaseSizeBeforeCreate + 1);
        Consumers testConsumers = consumersList.get(consumersList.size() - 1);
        assertThat(testConsumers.getName()).isEqualTo(DEFAULT_NAME);
        assertThat(testConsumers.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testConsumers.getPhone()).isEqualTo(DEFAULT_PHONE);
        assertThat(testConsumers.getWebsites()).isEqualTo(DEFAULT_WEBSITES);
    }

    @Test
    @Transactional
    public void createConsumersWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = consumersRepository.findAll().size();

        // Create the Consumers with an existing ID
        consumers.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restConsumersMockMvc.perform(post("/api/consumers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consumers)))
            .andExpect(status().isBadRequest());

        // Validate the Consumers in the database
        List<Consumers> consumersList = consumersRepository.findAll();
        assertThat(consumersList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    public void getAllConsumers() throws Exception {
        // Initialize the database
        consumersRepository.saveAndFlush(consumers);

        // Get all the consumersList
        restConsumersMockMvc.perform(get("/api/consumers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(consumers.getId().intValue())))
            .andExpect(jsonPath("$.[*].name").value(hasItem(DEFAULT_NAME.toString())))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL.toString())))
            .andExpect(jsonPath("$.[*].phone").value(hasItem(DEFAULT_PHONE.intValue())))
            .andExpect(jsonPath("$.[*].websites").value(hasItem(DEFAULT_WEBSITES.toString())));
    }
    
    @Test
    @Transactional
    public void getConsumers() throws Exception {
        // Initialize the database
        consumersRepository.saveAndFlush(consumers);

        // Get the consumers
        restConsumersMockMvc.perform(get("/api/consumers/{id}", consumers.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(consumers.getId().intValue()))
            .andExpect(jsonPath("$.name").value(DEFAULT_NAME.toString()))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL.toString()))
            .andExpect(jsonPath("$.phone").value(DEFAULT_PHONE.intValue()))
            .andExpect(jsonPath("$.websites").value(DEFAULT_WEBSITES.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingConsumers() throws Exception {
        // Get the consumers
        restConsumersMockMvc.perform(get("/api/consumers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateConsumers() throws Exception {
        // Initialize the database
        consumersRepository.saveAndFlush(consumers);

        int databaseSizeBeforeUpdate = consumersRepository.findAll().size();

        // Update the consumers
        Consumers updatedConsumers = consumersRepository.findById(consumers.getId()).get();
        // Disconnect from session so that the updates on updatedConsumers are not directly saved in db
        em.detach(updatedConsumers);
        updatedConsumers
            .name(UPDATED_NAME)
            .email(UPDATED_EMAIL)
            .phone(UPDATED_PHONE)
            .websites(UPDATED_WEBSITES);

        restConsumersMockMvc.perform(put("/api/consumers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedConsumers)))
            .andExpect(status().isOk());

        // Validate the Consumers in the database
        List<Consumers> consumersList = consumersRepository.findAll();
        assertThat(consumersList).hasSize(databaseSizeBeforeUpdate);
        Consumers testConsumers = consumersList.get(consumersList.size() - 1);
        assertThat(testConsumers.getName()).isEqualTo(UPDATED_NAME);
        assertThat(testConsumers.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testConsumers.getPhone()).isEqualTo(UPDATED_PHONE);
        assertThat(testConsumers.getWebsites()).isEqualTo(UPDATED_WEBSITES);
    }

    @Test
    @Transactional
    public void updateNonExistingConsumers() throws Exception {
        int databaseSizeBeforeUpdate = consumersRepository.findAll().size();

        // Create the Consumers

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restConsumersMockMvc.perform(put("/api/consumers")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(consumers)))
            .andExpect(status().isBadRequest());

        // Validate the Consumers in the database
        List<Consumers> consumersList = consumersRepository.findAll();
        assertThat(consumersList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteConsumers() throws Exception {
        // Initialize the database
        consumersRepository.saveAndFlush(consumers);

        int databaseSizeBeforeDelete = consumersRepository.findAll().size();

        // Get the consumers
        restConsumersMockMvc.perform(delete("/api/consumers/{id}", consumers.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isOk());

        // Validate the database is empty
        List<Consumers> consumersList = consumersRepository.findAll();
        assertThat(consumersList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Consumers.class);
        Consumers consumers1 = new Consumers();
        consumers1.setId(1L);
        Consumers consumers2 = new Consumers();
        consumers2.setId(consumers1.getId());
        assertThat(consumers1).isEqualTo(consumers2);
        consumers2.setId(2L);
        assertThat(consumers1).isNotEqualTo(consumers2);
        consumers1.setId(null);
        assertThat(consumers1).isNotEqualTo(consumers2);
    }
}
