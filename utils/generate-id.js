const GenerateID = ({
  testing_agency,
  AIDS_TASK_FORCE_RECORDS,
  NORA_RECORDS,
  CARE_ALLIANCE_RECORDS,
}) => {
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
