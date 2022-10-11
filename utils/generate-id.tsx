const GenerateID = (testing_agency: String, data: any) => {
  switch (testing_agency) {
    case "AIDS Task Force":
      return `ATF${data.AIDS_TASK_FORCE_RECORDS + 1}`;
    case "NORA":
      return `NORA${data.NORA_RECORDS + 1}`;
    case "Care Alliance":
      return `CA${data.CARE_ALLIANCE_RECORDS + 1}`;
  }
};

export default GenerateID;
