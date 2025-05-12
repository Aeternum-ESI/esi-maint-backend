import { AssetType } from "prisma/generated/client"


export const assetsSeed = [
    {
      "name": "Bloc Pédagogique",
      "inventoryCode": "BP",
      "type": "SITE",
      "children": [
        {
          "name": "Salle de lecture",
          "inventoryCode": "S-LECT",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "S-LECT-EQ-0001",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "S-LECT-EQ-0002",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "S-LECT-EQ-0003",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "S-LECT-EQ-0004",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "M1",
          "inventoryCode": "M1",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "M1-EQ-0005",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "M1-EQ-0006",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "M1-EQ-0007",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "M1-EQ-0008",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "M2",
          "inventoryCode": "M2",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "M2-EQ-0009",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "M2-EQ-0010",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "M2-EQ-0011",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "M2-EQ-0012",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "M3",
          "inventoryCode": "M3",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "M3-EQ-0013",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "M3-EQ-0014",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "M3-EQ-0015",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "M3-EQ-0016",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "M4",
          "inventoryCode": "M4",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "M4-EQ-0017",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "M4-EQ-0018",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "M4-EQ-0019",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "M4-EQ-0020",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "M5",
          "inventoryCode": "M5",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "M5-EQ-0021",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "M5-EQ-0022",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "M5-EQ-0023",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "M5-EQ-0024",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "M6",
          "inventoryCode": "M6",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "M6-EQ-0025",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "M6-EQ-0026",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "M6-EQ-0027",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "M6-EQ-0028",
              "type": "EQUIPMENT"
            }
          ]
        }
      ]
    },
    {
      "name": "Bloc Informatique",
      "inventoryCode": "BI",
      "type": "SITE",
      "children": [
        {
          "name": "Salle Info 1",
          "inventoryCode": "I1",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "I1-EQ-0029",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "I1-EQ-0030",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "I1-EQ-0031",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "I1-EQ-0032",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle Info 2",
          "inventoryCode": "I2",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "I2-EQ-0033",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "I2-EQ-0034",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "I2-EQ-0035",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "I2-EQ-0036",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle Info 3",
          "inventoryCode": "I3",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "I3-EQ-0037",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "I3-EQ-0038",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "I3-EQ-0039",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "I3-EQ-0040",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle Info 4",
          "inventoryCode": "I4",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "I4-EQ-0041",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "I4-EQ-0042",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "I4-EQ-0043",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "I4-EQ-0044",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle Info 5",
          "inventoryCode": "I5",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "I5-EQ-0045",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "I5-EQ-0046",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "I5-EQ-0047",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "I5-EQ-0048",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle Info 6",
          "inventoryCode": "I6",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "I6-EQ-0049",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "I6-EQ-0050",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "I6-EQ-0051",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "I6-EQ-0052",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle Info 7",
          "inventoryCode": "I7",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "I7-EQ-0053",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "I7-EQ-0054",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "I7-EQ-0055",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "I7-EQ-0056",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle Info 8",
          "inventoryCode": "I8",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "I8-EQ-0057",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "I8-EQ-0058",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "I8-EQ-0059",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "I8-EQ-0060",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle Info 9",
          "inventoryCode": "I9",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "I9-EQ-0061",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "I9-EQ-0062",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "I9-EQ-0063",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "I9-EQ-0064",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle Info 10",
          "inventoryCode": "I10",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "I10-EQ-0065",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "I10-EQ-0066",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "I10-EQ-0067",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "I10-EQ-0068",
              "type": "EQUIPMENT"
            }
          ]
        }
      ]
    },
    {
      "name": "Direction Generale",
      "inventoryCode": "DG",
      "type": "SITE",
      "children": [
        {
          "name": "Direction Generale A",
          "inventoryCode": "DG-A",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "DG-A-EQ-0069",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "DG-A-EQ-0070",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "DG-A-EQ-0071",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "DG-A-EQ-0072",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Direction Generale B",
          "inventoryCode": "DG-B",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "DG-B-EQ-0073",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "DG-B-EQ-0074",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "DG-B-EQ-0075",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "DG-B-EQ-0076",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Direction Generale C",
          "inventoryCode": "DG-C",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "DG-C-EQ-0077",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "DG-C-EQ-0078",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "DG-C-EQ-0079",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "DG-C-EQ-0080",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Direction Generale D",
          "inventoryCode": "DG-D",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "DG-D-EQ-0081",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "DG-D-EQ-0082",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "DG-D-EQ-0083",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "DG-D-EQ-0084",
              "type": "EQUIPMENT"
            }
          ]
        }
      ]
    },
    {
      "name": "Nouvelles Salles",
      "inventoryCode": "NS",
      "type": "SITE",
      "children": [
        {
          "name": "Nouvelle Salle 23",
          "inventoryCode": "NS23",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "NS23-EQ-0085",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "NS23-EQ-0086",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "NS23-EQ-0087",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "NS23-EQ-0088",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Nouvelle Salle 24",
          "inventoryCode": "NS24",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "NS24-EQ-0089",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "NS24-EQ-0090",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "NS24-EQ-0091",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "NS24-EQ-0092",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Nouvelle Salle 25",
          "inventoryCode": "NS25",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "NS25-EQ-0093",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "NS25-EQ-0094",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "NS25-EQ-0095",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "NS25-EQ-0096",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Nouvelle Salle 26",
          "inventoryCode": "NS26",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "NS26-EQ-0097",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "NS26-EQ-0098",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "NS26-EQ-0099",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "NS26-EQ-0100",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Nouvelle Salle 27",
          "inventoryCode": "NS27",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "NS27-EQ-0101",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "NS27-EQ-0102",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "NS27-EQ-0103",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "NS27-EQ-0104",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Nouvelle Salle 28",
          "inventoryCode": "NS28",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "NS28-EQ-0105",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "NS28-EQ-0106",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "NS28-EQ-0107",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "NS28-EQ-0108",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Nouvelle Salle 29",
          "inventoryCode": "NS29",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "NS29-EQ-0109",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "NS29-EQ-0110",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "NS29-EQ-0111",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "NS29-EQ-0112",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Nouvelle Salle 30",
          "inventoryCode": "NS30",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "NS30-EQ-0113",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "NS30-EQ-0114",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "NS30-EQ-0115",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "NS30-EQ-0116",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Nouvelle Salle 31",
          "inventoryCode": "NS31",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "NS31-EQ-0117",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "NS31-EQ-0118",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "NS31-EQ-0119",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "NS31-EQ-0120",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Nouvelle Salle 32",
          "inventoryCode": "NS32",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "NS32-EQ-0121",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "NS32-EQ-0122",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "NS32-EQ-0123",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "NS32-EQ-0124",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Nouvelle Salle 33",
          "inventoryCode": "NS33",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "NS33-EQ-0125",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "NS33-EQ-0126",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "NS33-EQ-0127",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "NS33-EQ-0128",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Amphi 5",
          "inventoryCode": "A5",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "A5-EQ-0129",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "A5-EQ-0130",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "A5-EQ-0131",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "A5-EQ-0132",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Amphi 6",
          "inventoryCode": "A6",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "A6-EQ-0133",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "A6-EQ-0134",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "A6-EQ-0135",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "A6-EQ-0136",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Amphi 7",
          "inventoryCode": "A7",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "A7-EQ-0137",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "A7-EQ-0138",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "A7-EQ-0139",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "A7-EQ-0140",
              "type": "EQUIPMENT"
            }
          ]
        }
      ]
    },
    {
      "name": "Espace Bibliotheque",
      "inventoryCode": "BIB",
      "type": "SITE",
      "children": [
        {
          "name": "Bibliotheque",
          "inventoryCode": "Bibliotheque",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "Bibliotheque-EQ-0141",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "Bibliotheque-EQ-0142",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "Bibliotheque-EQ-0143",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "Bibliotheque-EQ-0144",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Amphi Préparatoire 1",
          "inventoryCode": "AP1",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "AP1-EQ-0145",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "AP1-EQ-0146",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "AP1-EQ-0147",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "AP1-EQ-0148",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Amphi Préparatoire 2",
          "inventoryCode": "AP2",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "AP2-EQ-0149",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "AP2-EQ-0150",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "AP2-EQ-0151",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "AP2-EQ-0152",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Classe Préparatoire 1",
          "inventoryCode": "CP1",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "CP1-EQ-0153",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "CP1-EQ-0154",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "CP1-EQ-0155",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "CP1-EQ-0156",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Classe Préparatoire 2",
          "inventoryCode": "CP2",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "CP2-EQ-0157",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "CP2-EQ-0158",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "CP2-EQ-0159",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "CP2-EQ-0160",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Classe Préparatoire 3",
          "inventoryCode": "CP3",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "CP3-EQ-0161",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "CP3-EQ-0162",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "CP3-EQ-0163",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "CP3-EQ-0164",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Classe Préparatoire 4",
          "inventoryCode": "CP4",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "CP4-EQ-0165",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "CP4-EQ-0166",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "CP4-EQ-0167",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "CP4-EQ-0168",
              "type": "EQUIPMENT"
            }
          ]
        }
      ]
    },
    {
      "name": "Zone CP+S",
      "inventoryCode": "ZCS",
      "type": "SITE",
      "children": [
        {
          "name": "Classe Préparatoire 5",
          "inventoryCode": "CP5",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "CP5-EQ-0169",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "CP5-EQ-0170",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "CP5-EQ-0171",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "CP5-EQ-0172",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Classe Préparatoire 6",
          "inventoryCode": "CP6",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "CP6-EQ-0173",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "CP6-EQ-0174",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "CP6-EQ-0175",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "CP6-EQ-0176",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Classe Préparatoire 7",
          "inventoryCode": "CP7",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "CP7-EQ-0177",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "CP7-EQ-0178",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "CP7-EQ-0179",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "CP7-EQ-0180",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Classe Préparatoire 8",
          "inventoryCode": "CP8",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "CP8-EQ-0181",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "CP8-EQ-0182",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "CP8-EQ-0183",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "CP8-EQ-0184",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Classe Préparatoire 9",
          "inventoryCode": "CP9",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "CP9-EQ-0185",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "CP9-EQ-0186",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "CP9-EQ-0187",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "CP9-EQ-0188",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle 4",
          "inventoryCode": "S4",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "S4-EQ-0189",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "S4-EQ-0190",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "S4-EQ-0191",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "S4-EQ-0192",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle 4B",
          "inventoryCode": "S4B",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "S4B-EQ-0193",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "S4B-EQ-0194",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "S4B-EQ-0195",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "S4B-EQ-0196",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle 5",
          "inventoryCode": "S5",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "S5-EQ-0197",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "S5-EQ-0198",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "S5-EQ-0199",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "S5-EQ-0200",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle 6",
          "inventoryCode": "S6",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "S6-EQ-0201",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "S6-EQ-0202",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "S6-EQ-0203",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "S6-EQ-0204",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle 7",
          "inventoryCode": "S7",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "S7-EQ-0205",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "S7-EQ-0206",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "S7-EQ-0207",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "S7-EQ-0208",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle 8",
          "inventoryCode": "S8",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "S8-EQ-0209",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "S8-EQ-0210",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "S8-EQ-0211",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "S8-EQ-0212",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle 9",
          "inventoryCode": "S9",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "S9-EQ-0213",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "S9-EQ-0214",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "S9-EQ-0215",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "S9-EQ-0216",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle 10",
          "inventoryCode": "S10",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "S10-EQ-0217",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "S10-EQ-0218",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "S10-EQ-0219",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "S10-EQ-0220",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle 11",
          "inventoryCode": "S11",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "S11-EQ-0221",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "S11-EQ-0222",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "S11-EQ-0223",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "S11-EQ-0224",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle 12",
          "inventoryCode": "S12",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "S12-EQ-0225",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "S12-EQ-0226",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "S12-EQ-0227",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "S12-EQ-0228",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle 13",
          "inventoryCode": "S13",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "S13-EQ-0229",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "S13-EQ-0230",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "S13-EQ-0231",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "S13-EQ-0232",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle 14",
          "inventoryCode": "S14",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "S14-EQ-0233",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "S14-EQ-0234",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "S14-EQ-0235",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "S14-EQ-0236",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle 15",
          "inventoryCode": "S15",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "S15-EQ-0237",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "S15-EQ-0238",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "S15-EQ-0239",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "S15-EQ-0240",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle 16",
          "inventoryCode": "S16",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "S16-EQ-0241",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "S16-EQ-0242",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "S16-EQ-0243",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "S16-EQ-0244",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle 17",
          "inventoryCode": "S17",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "S17-EQ-0245",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "S17-EQ-0246",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "S17-EQ-0247",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "S17-EQ-0248",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle 18",
          "inventoryCode": "S18",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "S18-EQ-0249",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "S18-EQ-0250",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "S18-EQ-0251",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "S18-EQ-0252",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle 19",
          "inventoryCode": "S19",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "S19-EQ-0253",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "S19-EQ-0254",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "S19-EQ-0255",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "S19-EQ-0256",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle 20",
          "inventoryCode": "S20",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "S20-EQ-0257",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "S20-EQ-0258",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "S20-EQ-0259",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "S20-EQ-0260",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Salle 21",
          "inventoryCode": "S21",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "S21-EQ-0261",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "S21-EQ-0262",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "S21-EQ-0263",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "S21-EQ-0264",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Amphi 1",
          "inventoryCode": "A1",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "A1-EQ-0265",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "A1-EQ-0266",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "A1-EQ-0267",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "A1-EQ-0268",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Amphi 2",
          "inventoryCode": "A2",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "A2-EQ-0269",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "A2-EQ-0270",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "A2-EQ-0271",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "A2-EQ-0272",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Amphi 3",
          "inventoryCode": "A3",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "A3-EQ-0273",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "A3-EQ-0274",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "A3-EQ-0275",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "A3-EQ-0276",
              "type": "EQUIPMENT"
            }
          ]
        },
        {
          "name": "Amphi 4",
          "inventoryCode": "A4",
          "type": "ZONE",
          "children": [
            {
              "name": "Chaises",
              "inventoryCode": "A4-EQ-0277",
              "type": "EQUIPMENT"
            },
            {
              "name": "Tables",
              "inventoryCode": "A4-EQ-0278",
              "type": "EQUIPMENT"
            },
            {
              "name": "Projecteurs",
              "inventoryCode": "A4-EQ-0279",
              "type": "EQUIPMENT"
            },
            {
              "name": "Ordinateurs",
              "inventoryCode": "A4-EQ-0280",
              "type": "EQUIPMENT"
            }
          ]
        }
      ]
    }
  ]