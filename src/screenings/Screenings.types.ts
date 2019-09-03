export type Severity
  = "70-WARNING"
  | "60-OK"
  | "80-CRITICAL_ACKNOWLEDGED"
  | "30-UNKNOWN"
  | "90-CRITICAL"
  | null;

export interface Screening {
  readonly url: string;
  readonly company_blacklists: string;
  readonly port_blacklists: string;
  readonly country_blacklists: string;
  readonly ship_blacklists: string;
  readonly id: string;
  readonly created: string;
  readonly modified: string;
  readonly name: string;
  readonly company_check_prior_months: number;
  readonly company_check_prior_months_severity: Severity;
  readonly company_check_severity: Severity;
  readonly company_check_severity_technical_manager: Severity;
  readonly company_check_severity_technical_manager_sdn: Severity;
  readonly company_check_severity_technical_manager_generic: Severity;
  readonly company_check_severity_group_beneficial_owner: Severity;
  readonly company_check_severity_group_beneficial_owner_sdn: Severity;
  readonly company_check_severity_group_beneficial_owner_generic: Severity;
  readonly company_check_severity_ship_manager: Severity;
  readonly company_check_severity_ship_manager_sdn: Severity;
  readonly company_check_severity_ship_manager_generic: Severity;
  readonly company_check_severity_operator: Severity;
  readonly company_check_severity_operator_sdn: Severity;
  readonly company_check_severity_operator_generic: Severity;
  readonly company_check_severity_registered_owner: Severity;
  readonly company_check_severity_registered_owner_sdn: Severity;
  readonly company_check_severity_registered_owner_generic: Severity;
  readonly country_check_severity: Severity;
  readonly country_check_unknown_severity: Severity;
  readonly ship_sanction_check_severity: Severity;
  readonly ship_sanction_check_severity_sdn: Severity;
  readonly ship_sanction_check_severity_generic: Severity;
  readonly ship_sanction_prior_months: number;
  readonly ship_sanction_prior_months_severity: Severity;
  readonly port_visit_severity: Severity;
  readonly no_ais_position_severity: Severity;
  readonly zone_severity: Severity;
  readonly ship_inspection_detained: Severity;
  readonly ship_inspection_deficiency: Severity;
}