import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const JanusDeployment = buildModule("JanusDeployment", (m) => {
    // Get oracle address as parameter (will use deployer address)
    const oracleAddress = m.getParameter("oracleAddress");

    // 1. Deploy F1 Team Token (McLaren)
    const mclarenToken = m.contract("F1TeamToken", [
        "McLaren Racing Token",
        "MCLAREN",
        1000000,
    ]);

    // 2. Deploy JanusSwap AMM
    const janusSwap = m.contract("JanusSwap", [mclarenToken]);

    // 3. Deploy JanuPolis
    const januPolis = m.contract("JanuPolis", [
        mclarenToken,
        oracleAddress,
    ]);

    // 4. Deploy JanusAugur
    const janusAugur = m.contract("JanusAugur", [
        mclarenToken,
        oracleAddress,
    ]);

    return { mclarenToken, janusSwap, januPolis, janusAugur };
});

export default JanusDeployment;