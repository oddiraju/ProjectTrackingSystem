package com.sdc.projecttracking.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.sdc.projecttracking.web.rest.TestUtil;

public class SDTMTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(SDTM.class);
        SDTM sDTM1 = new SDTM();
        sDTM1.setId(1L);
        SDTM sDTM2 = new SDTM();
        sDTM2.setId(sDTM1.getId());
        assertThat(sDTM1).isEqualTo(sDTM2);
        sDTM2.setId(2L);
        assertThat(sDTM1).isNotEqualTo(sDTM2);
        sDTM1.setId(null);
        assertThat(sDTM1).isNotEqualTo(sDTM2);
    }
}
