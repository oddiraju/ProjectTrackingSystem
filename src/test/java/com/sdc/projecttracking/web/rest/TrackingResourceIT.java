package com.sdc.projecttracking.web.rest;

import com.sdc.projecttracking.ProjectTrackingSystemApp;
import com.sdc.projecttracking.domain.Tracking;
import com.sdc.projecttracking.repository.TrackingRepository;

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
 * Integration tests for the {@link TrackingResource} REST controller.
 */
@SpringBootTest(classes = ProjectTrackingSystemApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class TrackingResourceIT {

    private static final String DEFAULT_TEAM_MEMBER = "AAAAAAAAAA";
    private static final String UPDATED_TEAM_MEMBER = "BBBBBBBBBB";

    private static final Instant DEFAULT_DATE_STARTED = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATE_STARTED = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_ROLE = "AAAAAAAAAA";
    private static final String UPDATED_ROLE = "BBBBBBBBBB";

    private static final String DEFAULT_DATA_SOURCES = "AAAAAAAAAA";
    private static final String UPDATED_DATA_SOURCES = "BBBBBBBBBB";

    private static final String DEFAULT_DATA_VERSION = "AAAAAAAAAA";
    private static final String UPDATED_DATA_VERSION = "BBBBBBBBBB";

    private static final Instant DEFAULT_EXTRACT_DATE = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_EXTRACT_DATE = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    @Autowired
    private TrackingRepository trackingRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restTrackingMockMvc;

    private Tracking tracking;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tracking createEntity(EntityManager em) {
        Tracking tracking = new Tracking()
            .teamMember(DEFAULT_TEAM_MEMBER)
            .dateStarted(DEFAULT_DATE_STARTED)
            .role(DEFAULT_ROLE)
            .dataSources(DEFAULT_DATA_SOURCES)
            .dataVersion(DEFAULT_DATA_VERSION)
            .extractDate(DEFAULT_EXTRACT_DATE);
        return tracking;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Tracking createUpdatedEntity(EntityManager em) {
        Tracking tracking = new Tracking()
            .teamMember(UPDATED_TEAM_MEMBER)
            .dateStarted(UPDATED_DATE_STARTED)
            .role(UPDATED_ROLE)
            .dataSources(UPDATED_DATA_SOURCES)
            .dataVersion(UPDATED_DATA_VERSION)
            .extractDate(UPDATED_EXTRACT_DATE);
        return tracking;
    }

    @BeforeEach
    public void initTest() {
        tracking = createEntity(em);
    }

    @Test
    @Transactional
    public void createTracking() throws Exception {
        int databaseSizeBeforeCreate = trackingRepository.findAll().size();
        // Create the Tracking
        restTrackingMockMvc.perform(post("/api/trackings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tracking)))
            .andExpect(status().isCreated());

        // Validate the Tracking in the database
        List<Tracking> trackingList = trackingRepository.findAll();
        assertThat(trackingList).hasSize(databaseSizeBeforeCreate + 1);
        Tracking testTracking = trackingList.get(trackingList.size() - 1);
        assertThat(testTracking.getTeamMember()).isEqualTo(DEFAULT_TEAM_MEMBER);
        assertThat(testTracking.getDateStarted()).isEqualTo(DEFAULT_DATE_STARTED);
        assertThat(testTracking.getRole()).isEqualTo(DEFAULT_ROLE);
        assertThat(testTracking.getDataSources()).isEqualTo(DEFAULT_DATA_SOURCES);
        assertThat(testTracking.getDataVersion()).isEqualTo(DEFAULT_DATA_VERSION);
        assertThat(testTracking.getExtractDate()).isEqualTo(DEFAULT_EXTRACT_DATE);
    }

    @Test
    @Transactional
    public void createTrackingWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = trackingRepository.findAll().size();

        // Create the Tracking with an existing ID
        tracking.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restTrackingMockMvc.perform(post("/api/trackings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tracking)))
            .andExpect(status().isBadRequest());

        // Validate the Tracking in the database
        List<Tracking> trackingList = trackingRepository.findAll();
        assertThat(trackingList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkTeamMemberIsRequired() throws Exception {
        int databaseSizeBeforeTest = trackingRepository.findAll().size();
        // set the field null
        tracking.setTeamMember(null);

        // Create the Tracking, which fails.


        restTrackingMockMvc.perform(post("/api/trackings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tracking)))
            .andExpect(status().isBadRequest());

        List<Tracking> trackingList = trackingRepository.findAll();
        assertThat(trackingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkDateStartedIsRequired() throws Exception {
        int databaseSizeBeforeTest = trackingRepository.findAll().size();
        // set the field null
        tracking.setDateStarted(null);

        // Create the Tracking, which fails.


        restTrackingMockMvc.perform(post("/api/trackings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tracking)))
            .andExpect(status().isBadRequest());

        List<Tracking> trackingList = trackingRepository.findAll();
        assertThat(trackingList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllTrackings() throws Exception {
        // Initialize the database
        trackingRepository.saveAndFlush(tracking);

        // Get all the trackingList
        restTrackingMockMvc.perform(get("/api/trackings?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(tracking.getId().intValue())))
            .andExpect(jsonPath("$.[*].teamMember").value(hasItem(DEFAULT_TEAM_MEMBER)))
            .andExpect(jsonPath("$.[*].dateStarted").value(hasItem(DEFAULT_DATE_STARTED.toString())))
            .andExpect(jsonPath("$.[*].role").value(hasItem(DEFAULT_ROLE)))
            .andExpect(jsonPath("$.[*].dataSources").value(hasItem(DEFAULT_DATA_SOURCES)))
            .andExpect(jsonPath("$.[*].dataVersion").value(hasItem(DEFAULT_DATA_VERSION)))
            .andExpect(jsonPath("$.[*].extractDate").value(hasItem(DEFAULT_EXTRACT_DATE.toString())));
    }
    
    @Test
    @Transactional
    public void getTracking() throws Exception {
        // Initialize the database
        trackingRepository.saveAndFlush(tracking);

        // Get the tracking
        restTrackingMockMvc.perform(get("/api/trackings/{id}", tracking.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(tracking.getId().intValue()))
            .andExpect(jsonPath("$.teamMember").value(DEFAULT_TEAM_MEMBER))
            .andExpect(jsonPath("$.dateStarted").value(DEFAULT_DATE_STARTED.toString()))
            .andExpect(jsonPath("$.role").value(DEFAULT_ROLE))
            .andExpect(jsonPath("$.dataSources").value(DEFAULT_DATA_SOURCES))
            .andExpect(jsonPath("$.dataVersion").value(DEFAULT_DATA_VERSION))
            .andExpect(jsonPath("$.extractDate").value(DEFAULT_EXTRACT_DATE.toString()));
    }
    @Test
    @Transactional
    public void getNonExistingTracking() throws Exception {
        // Get the tracking
        restTrackingMockMvc.perform(get("/api/trackings/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateTracking() throws Exception {
        // Initialize the database
        trackingRepository.saveAndFlush(tracking);

        int databaseSizeBeforeUpdate = trackingRepository.findAll().size();

        // Update the tracking
        Tracking updatedTracking = trackingRepository.findById(tracking.getId()).get();
        // Disconnect from session so that the updates on updatedTracking are not directly saved in db
        em.detach(updatedTracking);
        updatedTracking
            .teamMember(UPDATED_TEAM_MEMBER)
            .dateStarted(UPDATED_DATE_STARTED)
            .role(UPDATED_ROLE)
            .dataSources(UPDATED_DATA_SOURCES)
            .dataVersion(UPDATED_DATA_VERSION)
            .extractDate(UPDATED_EXTRACT_DATE);

        restTrackingMockMvc.perform(put("/api/trackings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedTracking)))
            .andExpect(status().isOk());

        // Validate the Tracking in the database
        List<Tracking> trackingList = trackingRepository.findAll();
        assertThat(trackingList).hasSize(databaseSizeBeforeUpdate);
        Tracking testTracking = trackingList.get(trackingList.size() - 1);
        assertThat(testTracking.getTeamMember()).isEqualTo(UPDATED_TEAM_MEMBER);
        assertThat(testTracking.getDateStarted()).isEqualTo(UPDATED_DATE_STARTED);
        assertThat(testTracking.getRole()).isEqualTo(UPDATED_ROLE);
        assertThat(testTracking.getDataSources()).isEqualTo(UPDATED_DATA_SOURCES);
        assertThat(testTracking.getDataVersion()).isEqualTo(UPDATED_DATA_VERSION);
        assertThat(testTracking.getExtractDate()).isEqualTo(UPDATED_EXTRACT_DATE);
    }

    @Test
    @Transactional
    public void updateNonExistingTracking() throws Exception {
        int databaseSizeBeforeUpdate = trackingRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restTrackingMockMvc.perform(put("/api/trackings")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(tracking)))
            .andExpect(status().isBadRequest());

        // Validate the Tracking in the database
        List<Tracking> trackingList = trackingRepository.findAll();
        assertThat(trackingList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteTracking() throws Exception {
        // Initialize the database
        trackingRepository.saveAndFlush(tracking);

        int databaseSizeBeforeDelete = trackingRepository.findAll().size();

        // Delete the tracking
        restTrackingMockMvc.perform(delete("/api/trackings/{id}", tracking.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Tracking> trackingList = trackingRepository.findAll();
        assertThat(trackingList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
