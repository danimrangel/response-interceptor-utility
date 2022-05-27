
import { RequestTargets } from "./types"

export default<RequestTargets> [
  {
    endpoint: "/Home/Expedients",
    method: "GET",
    resolveByStart: {
      paramAmountFilter: 3,
    },
    assign: {
      rechargeable: true,
      causative: {
        name: 'Miguel',
        lastName: 'Rangel',
        nif: '59217662E',
        company: '00000999',
        policy: '123456789',
        identification: '00000001',
        otherCompanies: 'Altamira',
        causativeType: 'xxxxxxxxx',
      }
    },
  }
]