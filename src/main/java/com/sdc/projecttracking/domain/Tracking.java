package com.sdc.projecttracking.domain;

import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;

/**
 * A Tracking.
 */
@Entity
@Table(name = "tracking")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
public class Tracking implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "team_member", nullable = false)
    private String teamMember;

    @NotNull
    @Column(name = "date_started", nullable = false)
    private Instant dateStarted;

    @Column(name = "role")
    private String role;

    @Column(name = "data_sources")
    private String dataSources;

    @Column(name = "data_version")
    private String dataVersion;

    @Column(name = "extract_date")
    private Instant extractDate;

    @OneToOne
    @JoinColumn(unique = true)
    private Project project;

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTeamMember() {
        return teamMember;
    }

    public Tracking teamMember(String teamMember) {
        this.teamMember = teamMember;
        return this;
    }

    public void setTeamMember(String teamMember) {
        this.teamMember = teamMember;
    }

    public Instant getDateStarted() {
        return dateStarted;
    }

    public Tracking dateStarted(Instant dateStarted) {
        this.dateStarted = dateStarted;
        return this;
    }

    public void setDateStarted(Instant dateStarted) {
        this.dateStarted = dateStarted;
    }

    public String getRole() {
        return role;
    }

    public Tracking role(String role) {
        this.role = role;
        return this;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getDataSources() {
        return dataSources;
    }

    public Tracking dataSources(String dataSources) {
        this.dataSources = dataSources;
        return this;
    }

    public void setDataSources(String dataSources) {
        this.dataSources = dataSources;
    }

    public String getDataVersion() {
        return dataVersion;
    }

    public Tracking dataVersion(String dataVersion) {
        this.dataVersion = dataVersion;
        return this;
    }

    public void setDataVersion(String dataVersion) {
        this.dataVersion = dataVersion;
    }

    public Instant getExtractDate() {
        return extractDate;
    }

    public Tracking extractDate(Instant extractDate) {
        this.extractDate = extractDate;
        return this;
    }

    public void setExtractDate(Instant extractDate) {
        this.extractDate = extractDate;
    }

    public Project getProject() {
        return project;
    }

    public Tracking project(Project project) {
        this.project = project;
        return this;
    }

    public void setProject(Project project) {
        this.project = project;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Tracking)) {
            return false;
        }
        return id != null && id.equals(((Tracking) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Tracking{" +
            "id=" + getId() +
            ", teamMember='" + getTeamMember() + "'" +
            ", dateStarted='" + getDateStarted() + "'" +
            ", role='" + getRole() + "'" +
            ", dataSources='" + getDataSources() + "'" +
            ", dataVersion='" + getDataVersion() + "'" +
            ", extractDate='" + getExtractDate() + "'" +
            "}";
    }
}
