"use client"

import OrganizationData from "@/components/organization-units/tree/organization-data"
import OrganizationTree from "@/components/organization-units/tree/organization-tree"
import { Grid } from "@mui/material"
import { useState } from "react"

export default function UnitsPageMain({ units, members, roles }: any) {
    const [selectedUnit, setSelectedUnit] = useState(-1);
    return (
        <>
            <div className="m-2">
                <Grid container spacing={2}>
                    <Grid item md={5} sm={12}>
                        <OrganizationTree units={units} updateSelection={setSelectedUnit} />
                    </Grid>
                    <Grid item md={7} sm={12}>
                        <OrganizationData selectedUnit={selectedUnit} members={members} roles={roles} />
                    </Grid>
                </Grid>
            </div>
        </>
    );
}