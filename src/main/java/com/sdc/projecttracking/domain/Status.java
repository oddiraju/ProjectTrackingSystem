package com.sdc.projecttracking.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;

/**
 * A Status.
 */
@Entity
@Table(name = "status")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Status implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "deliverable", nullable = false)
    private String deliverable;

    @Column(name = "status")
    private String status;

    @OneToOne
    @JoinColumn(unique = true)
    private Project project;

    @OneToOne
    @JoinColumn(unique = true)
    private SDTM sdtm;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDeliverable() {
        return deliverable;
    }

    public Status deliverable(String deliverable) {
        this.deliverable = deliverable;
        return this;
    }

    public void setDeliverable(String deliverable) {
        this.deliverable = deliverable;
    }

    public String getStatus() {
        return status;
    }

    public Status status(String status) {
        this.status = status;
        return this;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Project getProject() {
        return project;
    }

    public Status project(Project project) {
        this.project = project;
        return this;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public SDTM getSdtm() {
        return sdtm;
    }

    public Status sdtm(SDTM sDTM) {
        this.sdtm = sDTM;
        return this;
    }

    public void setSdtm(SDTM sDTM) {
        this.sdtm = sDTM;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Status)) {
            return false;
        }
        return id != null && id.equals(((Status) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Status{" +
            "id=" + getId() +
            ", deliverable='" + getDeliverable() + "'" +
            ", status='" + getStatus() + "'" +
            "}";
    }
}
