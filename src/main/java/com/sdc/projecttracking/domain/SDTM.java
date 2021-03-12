package com.sdc.projecttracking.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A SDTM.
 */
@Entity
@Table(name = "sdtm")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class SDTM implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "dataset_name", nullable = false)
    private String datasetName;

    @Column(name = "title")
    private String title;

    @Column(name = "program_name")
    private String programName;

    @Column(name = "programmer")
    private String programmer;

    @Column(name = "completion_date")
    private Instant completionDate;

    @Column(name = "validation_method")
    private String validationMethod;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDatasetName() {
        return datasetName;
    }

    public SDTM datasetName(String datasetName) {
        this.datasetName = datasetName;
        return this;
    }

    public void setDatasetName(String datasetName) {
        this.datasetName = datasetName;
    }

    public String getTitle() {
        return title;
    }

    public SDTM title(String title) {
        this.title = title;
        return this;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getProgramName() {
        return programName;
    }

    public SDTM programName(String programName) {
        this.programName = programName;
        return this;
    }

    public void setProgramName(String programName) {
        this.programName = programName;
    }

    public String getProgrammer() {
        return programmer;
    }

    public SDTM programmer(String programmer) {
        this.programmer = programmer;
        return this;
    }

    public void setProgrammer(String programmer) {
        this.programmer = programmer;
    }

    public Instant getCompletionDate() {
        return completionDate;
    }

    public SDTM completionDate(Instant completionDate) {
        this.completionDate = completionDate;
        return this;
    }

    public void setCompletionDate(Instant completionDate) {
        this.completionDate = completionDate;
    }

    public String getValidationMethod() {
        return validationMethod;
    }

    public SDTM validationMethod(String validationMethod) {
        this.validationMethod = validationMethod;
        return this;
    }

    public void setValidationMethod(String validationMethod) {
        this.validationMethod = validationMethod;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof SDTM)) {
            return false;
        }
        return id != null && id.equals(((SDTM) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "SDTM{" +
            "id=" + getId() +
            ", datasetName='" + getDatasetName() + "'" +
            ", title='" + getTitle() + "'" +
            ", programName='" + getProgramName() + "'" +
            ", programmer='" + getProgrammer() + "'" +
            ", completionDate='" + getCompletionDate() + "'" +
            ", validationMethod='" + getValidationMethod() + "'" +
            "}";
    }
}
