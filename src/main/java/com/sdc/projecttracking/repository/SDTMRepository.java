package com.sdc.projecttracking.repository;

import com.sdc.projecttracking.domain.SDTM;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the SDTM entity.
 */
@SuppressWarnings("unused")
@Repository
public interface SDTMRepository extends JpaRepository<SDTM, Long> {
}
