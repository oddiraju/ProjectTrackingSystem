package com.sdc.projecttracking.web.rest;

import com.sdc.projecttracking.domain.SDTM;
import com.sdc.projecttracking.repository.SDTMRepository;
import com.sdc.projecttracking.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.sdc.projecttracking.domain.SDTM}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class SDTMResource {

    private final Logger log = LoggerFactory.getLogger(SDTMResource.class);

    private static final String ENTITY_NAME = "sDTM";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final SDTMRepository sDTMRepository;

    public SDTMResource(SDTMRepository sDTMRepository) {
        this.sDTMRepository = sDTMRepository;
    }

    /**
     * {@code POST  /sdtms} : Create a new sDTM.
     *
     * @param sDTM the sDTM to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new sDTM, or with status {@code 400 (Bad Request)} if the sDTM has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/sdtms")
    public ResponseEntity<SDTM> createSDTM(@Valid @RequestBody SDTM sDTM) throws URISyntaxException {
        log.debug("REST request to save SDTM : {}", sDTM);
        if (sDTM.getId() != null) {
            throw new BadRequestAlertException("A new sDTM cannot already have an ID", ENTITY_NAME, "idexists");
        }
        SDTM result = sDTMRepository.save(sDTM);
        return ResponseEntity.created(new URI("/api/sdtms/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /sdtms} : Updates an existing sDTM.
     *
     * @param sDTM the sDTM to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated sDTM,
     * or with status {@code 400 (Bad Request)} if the sDTM is not valid,
     * or with status {@code 500 (Internal Server Error)} if the sDTM couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/sdtms")
    public ResponseEntity<SDTM> updateSDTM(@Valid @RequestBody SDTM sDTM) throws URISyntaxException {
        log.debug("REST request to update SDTM : {}", sDTM);
        if (sDTM.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        SDTM result = sDTMRepository.save(sDTM);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, sDTM.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /sdtms} : get all the sDTMS.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of sDTMS in body.
     */
    @GetMapping("/sdtms")
    public List<SDTM> getAllSDTMS() {
        log.debug("REST request to get all SDTMS");
        return sDTMRepository.findAll();
    }

    /**
     * {@code GET  /sdtms/:id} : get the "id" sDTM.
     *
     * @param id the id of the sDTM to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the sDTM, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/sdtms/{id}")
    public ResponseEntity<SDTM> getSDTM(@PathVariable Long id) {
        log.debug("REST request to get SDTM : {}", id);
        Optional<SDTM> sDTM = sDTMRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(sDTM);
    }

    /**
     * {@code DELETE  /sdtms/:id} : delete the "id" sDTM.
     *
     * @param id the id of the sDTM to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/sdtms/{id}")
    public ResponseEntity<Void> deleteSDTM(@PathVariable Long id) {
        log.debug("REST request to delete SDTM : {}", id);
        sDTMRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
