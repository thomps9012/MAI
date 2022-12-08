const GenerateID = (
  testing_agency: string,
  AIDS_TASK_FORCE_RECORDS: number,
  NORA_RECORDS: number,
  CARE_ALLIANCE_RECORDS: number
) => {
  switch (testing_agency) {
    case "AIDS Task Force":
      return `ATF${AIDS_TASK_FORCE_RECORDS + 1}`;
    case "NORA":
      return `NORA${NORA_RECORDS + 1}`;
    case "Care Alliance":
      return `CA${CARE_ALLIANCE_RECORDS + 1}`;
  }
};

export default GenerateID;
