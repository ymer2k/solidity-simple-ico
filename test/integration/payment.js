const Ico = artifacts.require('Ico')

contract('payment', (accounts) =>{ 


    it("Should change token price and check that it worked", async () =>{
        const instance = await Ico.deployed()
        const expectedPrice = 69

        await instance.changeTokenPrice(expectedPrice)
        const value = await instance.tokenPrice.call()
        assert.equal(parseInt(value),expectedPrice) // ParseInt converts a string to an integear
    })

    // This test doesn't work anymore since I changed how we pay for tokens but keep it for future reference
    // it("Calculate correct eth to token amount", async () =>{
    //     const instance = await Ico.deployed()
    //     const ethereumAmount = 10
    //     const expectedPrice = 10
    //     const expectedTokensBought = 100
    //     // set the token price
    //     await instance.changeTokenPrice(expectedPrice)

    //     //Buy tokens
    //     await instance.buyTokens(ethereumAmount)
    //     // Get the address that bought tokens.
    //     // Just use accounts[0] that seem to be the default address!

    //     // Check that the address got the correct amount of tokens.
    //     const value = await instance.balances(accounts[0])
    //     assert.equal(parseInt(value),expectedTokensBought)

    // })
  
    it("should not allow other addresses than owner to change the tokenPrice", async function () {
        // This test will test that we get an error when notOwner tries to change the token price!
        // And if we get an error, that means that the test passed!
        try { 
            const instance = await Ico.deployed()
            const notOwner = accounts[1]
            await instance.changeTokenPrice(69,{
                from: notOwner // can set which address called the function!
                // , value: 1 // just to show for reference later that we can do this..
            })
            // Since it didnt throw an error it reached this line
            //and we will NOW throw an error instead which will fail the test.
            assert.fail("The transaction should have thrown an error");
        }
        catch (err) { // If it did throw an error in the try {} then assert.include I guess give an OK to the test.
            assert.include(err.message, "revert", "The error message should contain 'revert'");
        }
    });

    //Lets write a test that checks that the deployer of the contract is the owner.
    it("The deployer of the contract is the owner", async () =>{
        //const instance = await Ico.deployed(accounts[0], {from:accounts[0]})
        const instance = await Ico.deployed()

        const value = await instance.owner.call()
        const owner = accounts[0]
  
        assert.equal(parseInt(value),owner)
    })

    // // Test buy tokens and check token balance.
    // it("Sender should receive correct amount of tokens after sending eth", async () =>{
    //     const instance = await Ico.deployed()
    //     const ethereumAmount = 10
    //     const expectedTokensBought = 10;
    //     // Should call the fallback function
    //     //and thus also the buyTokens function
    //     await instance.send(ethereumAmount, {from: accounts[1]}) 

    //     //Check the balance.
    //     const value = await instance.balances(accounts[1])
    //     assert.equal(parseInt(value),expectedTokensBought)

    // })

    //Test buy tokens and check eth balance of owner and sender


   // This test should suck my dick
})



//
contract('ETH payment', (accounts) =>{ 

    // Check balance of account
    it("Test get balance", async () =>{
        const instance = await Ico.deployed();

        console.log("deployed address:" +  instance.address);
        console.log("A different address:" + accounts[1])
        let balance = await web3.eth.getBalance(accounts[1]);
        console.log("Address balance before:" +  web3.utils.fromWei(balance,"ether"));
        //web3.utils.fromWei(balance1, "ether")
    })


    // Test buy tokens and check token balance.
    it("Sender should receive correct amount of tokens after sending eth", async () =>{
        const instance = await Ico.deployed()
        const ethereumAmountString = "10"
        const expectedTokensBought = 100;
        // Should call the fallback function
        //and thus also the buyTokens function
        await instance.send(web3.utils.toWei(ethereumAmountString,'ether'), {from: accounts[1]}) // convert 10 eth to wei
        //Check the balance.
        const tokenAmount = await instance.balances(accounts[1]) // will return a string
        assert.equal(parseInt(tokenAmount),expectedTokensBought)
        let balance = await web3.eth.getBalance(accounts[1]);
        console.log("Amount of tokens Bought:" +  tokenAmount);
        

    })
})