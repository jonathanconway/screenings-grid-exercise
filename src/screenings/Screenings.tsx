import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Action } from "redux";

import { Container, Title, Body, FilterGridContainer } from "./Screenings.styles";
import { Screening, Severity as SeverityType } from "./Screenings.types";
import { State, setFilters, setSorts, loadScreenings, makeSelectSortedFilteredScreenings } from "./Screenings.redux";

import { Table } from "../components/table/Table";
import { FilterBuilder } from "../components/filter-builder/FilterBuilder";
import { Severity } from "./severity-cell/SeverityCell";
import { Filter, Column, Sorts } from "../querying/querying.types";
import { DateCell } from "./date-cell/DateCell";
import { Spinner } from "../components/spinner/Spinner";

const severities = [
    "70-WARNING",
    "60-OK",
    "80-CRITICAL_ACKNOWLEDGED",
    "30-UNKNOWN",
    "90-CRITICAL",
  ].map(x => ({
    label: x,
    value: x
  }));

const columns: readonly Column<Screening>[] =
  [{
    key: "id",
    label: "ID",
    description: "ID",
    dataType: "string",
    width: 70
  }, {
    key: "name",
    label: "Name",
    description: "Name",
    dataType: "string",
    width: 200
  }, {
    key: "created",
    label: "Created",
    description: "Created",
    dataType: "datetime",
    width: 100
  }, {
    key: "modified",
    label: "Modified",
    description: "Modified",
    dataType: "datetime",
    width: 100
  }, {
    key: "company_check_prior_months",
    label: "CC-PM",
    description: "Company Check - Prior Months",
    dataType: "number",
    width: 70
  }, {
    key: "company_check_prior_months_severity",
    label: "CC-PM-S",
    description: "Company Check - Prior Months - Severity",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "company_check_severity",
    label: "CC-S",
    description: "Company Check - Severity",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "company_check_severity_technical_manager",
    label: "CC-S-TM",
    description: "Company Check - Severity - Technical Manager",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "company_check_severity_technical_manager_sdn",
    label: "CC-S-TM-SDN",
    description: "Company Check - Severity - Technical Manager - SDN",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "company_check_severity_technical_manager_generic",
    label: "CC-S-TM-G",
    description: "Company Check - Severity - Technical Manager - Generic",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "company_check_severity_group_beneficial_owner",
    label: "CC-S-GBO",
    description: "Company Check - Severity - Group - Beneficial Owner",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "company_check_severity_group_beneficial_owner_sdn",
    label: "CC-S-GBO-SDN",
    description: "Company Check - Severity - Group - Beneficial Owner - SDN",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "company_check_severity_group_beneficial_owner_generic",
    label: "CC-S-GBO-G",
    description: "Company Check - Severity - Group - Beneficial Owner - Generic",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "company_check_severity_ship_manager",
    label: "CC-S-SM",
    description: "Company Check - Severity - Ship Manager",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "company_check_severity_ship_manager_sdn",
    label: "Cc-S-SM-SDN",
    description: "Company Check - Severity - Ship Manager - SDN",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "company_check_severity_ship_manager_generic",
    label: "CC-S-SM-G",
    description: "Company Check - Severity - Ship Manager - Generic",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "company_check_severity_operator",
    label: "CC-S-O",
    description: "Company Check - Severity - Operator",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "company_check_severity_operator_sdn",
    label: "CC-S-O-SDN",
    description: "Company Check - Severity - Operator - SDN",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "company_check_severity_operator_generic",
    label: "CC-S-O-G",
    description: "Company Check - Severity - Operator - Generic",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "company_check_severity_registered_owner",
    label: "CC-S-RO",
    description: "Company Check - Severity - Registered Owner",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "company_check_severity_registered_owner_sdn",
    label: "CC-S-RO-SDN",
    description: "Company Check - Severity - Registered Owner - SDN",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "company_check_severity_registered_owner_generic",
    label: "CC-S-RO-G",
    description: "Company Check - Severity - Registered Owner - Generic",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "country_check_severity",
    label: "CC-S",
    description: "Country Check - Severity",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "country_check_unknown_severity",
    label: "CC-U-S",
    description: "Country Check - Unknown - Severity",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "ship_sanction_check_severity",
    label: "SS-C-S",
    description: "Ship Sanction Check - Severity",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "ship_sanction_check_severity_sdn",
    label: "SS-C-S-SDN",
    description: "Ship Sanction Check - Severity - SDN",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "ship_sanction_check_severity_generic",
    label: "SS-C-S-G",
    description: "Ship Sanction Check - Severity - Generic",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "ship_sanction_prior_months",
    label: "SS-PM",
    description: "Ship Sanction - Prior Months",
    dataType: "number",
    width: 70
  }, {
    key: "ship_sanction_prior_months_severity",
    label: "SS-PM-S",
    description: "Ship Sanction - Prior Months - Severity",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "port_visit_severity",
    label: "P-V-S",
    description: "Port Visit - Severity",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "no_ais_position_severity",
    label: "N-AIS-PS",
    description: "No AIS Position - Severity",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "zone_severity",
    label: "Z-S",
    description: "Zone - Severity",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "ship_inspection_detained",
    label: "S-I-DET",
    description: "Ship Inspection - Detained",
    dataType: "severity",
    options: severities,
    width: 70
  }, {
    key: "ship_inspection_deficiency",
    label: "S-I-DEF",
    description: "Ship Inspection - Deficiency",
    dataType: "severity",
    options: severities,
    width: 70
  }];

interface ScreeningsProps {
  readonly screenings: readonly Screening[];
  readonly isLoading: boolean;
  readonly filters: readonly Filter<Screening>[];
  readonly sorts: Sorts<Screening>;
  readonly setFilters: (newFilters: readonly Filter<Screening>[]) => Action;
  readonly setSorts: (newSorts: Sorts<Screening>) => Action;
  readonly loadScreenings: () => Promise<Action>;
}


const ScreeningsComponent = (props: ScreeningsProps) => {
  
  // Only load data on first mount.
  // eslint-disable-next-line
  useEffect(() => { props.loadScreenings(); }, []);

  const handleClickSeverity = (columnKey: keyof Screening, value: SeverityType) =>
    props.setFilters([
      ...props.filters,
      {
        columnKey,
        operator: "=",
        value
      }
    ]);

  return (
    <Container>
      <Title>Screenings</Title>

      <Body>
        {props.isLoading
          ? <Spinner />
          : <FilterGridContainer>
              <FilterBuilder
                filters={props.filters}
                fields={columns}
                onFiltersChange={props.setFilters}
              />
              <Table<Screening>
                items={props.screenings}
                columns={columns}
                sorts={props.sorts}
                onSort={props.setSorts}
                cellRenderer={(data, item, column) => {
                  switch (column.dataType) {
                    case "severity":
                      return (
                        <Severity
                          severity={data as SeverityType}
                          onClick={() => handleClickSeverity(column.key, data as SeverityType)}
                      />);
                    case "datetime":
                      return data ? <DateCell date={new Date(data.toString())} /> : <></>;
                    default:
                      return <span title={(data || "").toString()}>{data || ""}</span>;
                  }
                }}
              />
            </FilterGridContainer>}
      </Body>
    </Container>
  );

};

const makeMapStateToProps = () => {
  const selectSortedFilteredScreenings = makeSelectSortedFilteredScreenings();
  const mapStateToProps = (state: State) => ({
    screenings: selectSortedFilteredScreenings(state),
    isLoading: state.isLoading,
    filters: state.filters,
    sorts: state.sorts
  });
  return mapStateToProps;
};

const mapDispatchToProps = {
  setFilters,
  setSorts,
  loadScreenings
};

export const Screenings = connect(makeMapStateToProps, mapDispatchToProps)(ScreeningsComponent)