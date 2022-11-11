const {
    expectEvent,
    BN
  } = require('@openzeppelin/test-helpers');
const web3 = require('web3');
const etherToWei = (n) => {
    return new web3.utils.BN(web3.utils.toWei(n.toString(), 'ether'));
  };
const TOTAL_SUPPLY = etherToWei(1000_000);
const GoldToken = artifacts.require('GoldToken');

contract('GoldToken', async ([owner, otherAccount]) => {
    beforeEach(async () => {
        this.goldToken = await GoldToken.new(TOTAL_SUPPLY);
    });

    describe("Deployment",  () => {
        it("Should has total supply of 1000000 GoldTokens", async () => {
            const totalSupply = await this.goldToken.totalSupply();
            expect(totalSupply.toString()).to.equal(TOTAL_SUPPLY.toString());
        });

        it("Should emit Transfer event with correct arguments", async () => {
            const trx = await this.goldToken.transfer(otherAccount, 1000, {from:owner});
            expectEvent(trx, "Transfer", {
                from: owner,
                to: otherAccount,
                value: new BN('1000')
            });
        });
    });
});