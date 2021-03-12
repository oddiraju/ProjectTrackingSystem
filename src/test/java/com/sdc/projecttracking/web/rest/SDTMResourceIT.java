package com.sdc.projecttracking.web.rest;

import com.sdc.projecttracking.ProjectTrackingSystemApp;
import com.sdc.projecttracking.domain.SDTM;
import com.sdc.projecttracking.repository.SDTMRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link SDTMResource} REST controller.
 */
@SpringBootTest(classes = ProjectTrackingSystemApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class SDTMResourceIT {

    private static final String DEFAULT_DATASET_NAME = "AAAAAAAAAA";
    private static final String UPDATED_DATASET_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_PROGRAM_NAME = "AAAAAAAAAA";
    private static final String UPDATED_PROGRAM_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_PROGRAMMER = "AAAAAAAAAA";
    private static final String UPDATED_PROGRAMMER = "BBBBBBBBBB";

    private static final Instant DEFAULT_COMPLETION_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_COMPLETION_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_VALIDATION_METHOD = "AAAAAAAAAA";
    private static final String UPDATED_VALIDATION_METHOD = "BBBBBBBBBB";

    @Autowired
    private SDTMRepository sDTMRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restSDTMMockMvc;

    private SDTM sDTM;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SDTM createEntity(EntityManager em) {
        SDTM sDTM = new SDTM()
            .datasetName(DEFAULT_DATASET_NAME)
            .title(DEFAULT_TITLE)
            .programName(DEFAULT_PROGRAM_NAME)
            .programmer(DEFAULT_PROGRAMMER)
            .completionDate(DEFAULT_COMPLETION_DATE)
            .validationMethod(DEFAULT_VALIDATION_METHOD);
        return sDTM;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static SDTM createUpdatedEntity(EntityManager em) {
        SDTM sDTM = new SDTM()
            .datasetName(UPDATED_DATASET_NAME)
            .title(UPDATED_TITLE)
            .programName(UPDATED_PROGRAM_NAME)
            .programmer(UPDATED_PROGRAMMER)
            .completionDate(UPDATED_COMPLETION_DATE)
            .validationMethod(UPDATED_VALIDATION_METHOD);
        return sDTM;
    }

    @BeforeEach
    public void initTest() {
        sDTM = createEntity(em);
    }

    @Test
    @Transactional
    public void createSDTM() throws Exception {
        int databaseSizeBeforeCreate = sDTMRepository.findAll().size();
        // Create the SDTM
        restSDTMMockMvc.perform(post("/api/sdtms")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sDTM)))
            .andExpect(status().isCreated());

        // Validate the SDTM in the database
        List<SDTM> sDTMList = sDTMRepository.findAll();
        assertThat(sDTMList).hasSize(databaseSizeBeforeCreate + 1);
        SDTM testSDTM = sDTMList.get(sDTMList.size() - 1);
        assertThat(testSDTM.getDatasetName()).isEqualTo(DEFAULT_DATASET_NAME);
        assertThat(testSDTM.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testSDTM.getProgramName()).isEqualTo(DEFAULT_PROGRAM_NAME);
        assertThat(testSDTM.getProgrammer()).isEqualTo(DEFAULT_PROGRAMMER);
        assertThat(testSDTM.getCompletionDate()).isEqualTo(DEFAULT_COMPLETION_DATE);
        assertThat(testSDTM.getValidationMethod()).isEqualTo(DEFAULT_VALIDATION_METHOD);
    }

    @Test
    @Transactional
    public void createSDTMWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = sDTMRepository.findAll().size();

        // Create the SDTM with an existing ID
        sDTM.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restSDTMMockMvc.perform(post("/api/sdtms")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sDTM)))
            .andExpect(status().isBadRequest());

        // Validate the SDTM in the database
        List<SDTM> sDTMList = sDTMRepository.findAll();
        assertThat(sDTMList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkDatasetNameIsRequired() throws Exception {
        int databaseSizeBeforeTest = sDTMRepository.findAll().size();
        // set the field null
        sDTM.setDatasetName(null);

        // Create the SDTM, which fails.


        restSDTMMockMvc.perform(post("/api/sdtms")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sDTM)))
            .andExpect(status().isBadRequest());

        List<SDTM> sDTMList = sDTMRepository.findAll();
        assertThat(sDTMList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllSDTMS() throws Exception {
        // Initialize the database
        sDTMRepository.saveAndFlush(sDTM);

        // Get all the sDTMList
        restSDTMMockMvc.perform(get("/api/sdtms?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(sDTM.getId().intValue())))
            .andExpect(jsonPath("$.[*].datasetName").value(hasItem(DEFAULT_DATASET_NAME)))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE)))
            .andExpect(jsonPath("$.[*].programName").value(hasItem(DEFAULT_PROGRAM_NAME)))
            .andExpect(jsonPath("$.[*].programmer").value(hasItem(DEFAULT_PROGRAMMER)))
            .andExpect(jsonPath("$.[*].completionDate").value(hasItem(DEFAULT_COMPLETION_DATE.toString())))
            .andExpect(jsonPath("$.[*].validationMethod").value(hasItem(DEFAULT_VALIDATION_METHOD)));
    }
    
    @Test
    @Transactional
    public void getSDTM() throws Exception {
        // Initialize the database
        sDTMRepository.saveAndFlush(sDTM);

        // Get the sDTM
        restSDTMMockMvc.perform(get("/api/sdtms/{id}", sDTM.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(sDTM.getId().intValue()))
            .andExpect(jsonPath("$.datasetName").value(DEFAULT_DATASET_NAME))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE))
            .andExpect(jsonPath("$.programName").value(DEFAULT_PROGRAM_NAME))
            .andExpect(jsonPath("$.programmer").value(DEFAULT_PROGRAMMER))
            .andExpect(jsonPath("$.completionDate").value(DEFAULT_COMPLETION_DATE.toString()))
            .andExpect(jsonPath("$.validationMethod").value(DEFAULT_VALIDATION_METHOD));
    }
    @Test
    @Transactional
    public void getNonExistingSDTM() throws Exception {
        // Get the sDTM
        restSDTMMockMvc.perform(get("/api/sdtms/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateSDTM() throws Exception {
        // Initialize the database
        sDTMRepository.saveAndFlush(sDTM);

        int databaseSizeBeforeUpdate = sDTMRepository.findAll().size();

        // Update the sDTM
        SDTM updatedSDTM = sDTMRepository.findById(sDTM.getId()).get();
        // Disconnect from session so that the updates on updatedSDTM are not directly saved in db
        em.detach(updatedSDTM);
        updatedSDTM
            .datasetName(UPDATED_DATASET_NAME)
            .title(UPDATED_TITLE)
            .programName(UPDATED_PROGRAM_NAME)
            .programmer(UPDATED_PROGRAMMER)
            .completionDate(UPDATED_COMPLETION_DATE)
            .validationMethod(UPDATED_VALIDATION_METHOD);

        restSDTMMockMvc.perform(put("/api/sdtms")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedSDTM)))
            .andExpect(status().isOk());

        // Validate the SDTM in the database
        List<SDTM> sDTMList = sDTMRepository.findAll();
        assertThat(sDTMList).hasSize(databaseSizeBeforeUpdate);
        SDTM testSDTM = sDTMList.get(sDTMList.size() - 1);
        assertThat(testSDTM.getDatasetName()).isEqualTo(UPDATED_DATASET_NAME);
        assertThat(testSDTM.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testSDTM.getProgramName()).isEqualTo(UPDATED_PROGRAM_NAME);
        assertThat(testSDTM.getProgrammer()).isEqualTo(UPDATED_PROGRAMMER);
        assertThat(testSDTM.getCompletionDate()).isEqualTo(UPDATED_COMPLETION_DATE);
        assertThat(testSDTM.getValidationMethod()).isEqualTo(UPDATED_VALIDATION_METHOD);
    }

    @Test
    @Transactional
    public void updateNonExistingSDTM() throws Exception {
        int databaseSizeBeforeUpdate = sDTMRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restSDTMMockMvc.perform(put("/api/sdtms")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(sDTM)))
            .andExpect(status().isBadRequest());

        // Validate the SDTM in the database
        List<SDTM> sDTMList = sDTMRepository.findAll();
        assertThat(sDTMList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteSDTM() throws Exception {
        // Initialize the database
        sDTMRepository.saveAndFlush(sDTM);

        int databaseSizeBeforeDelete = sDTMRepository.findAll().size();

        // Delete the sDTM
        restSDTMMockMvc.perform(delete("/api/sdtms/{id}", sDTM.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<SDTM> sDTMList = sDTMRepository.findAll();
        assertThat(sDTMList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
