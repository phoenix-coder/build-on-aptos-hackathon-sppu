// module twitter_addr::twitter {

//     use std::signer;
//     use aptos_framework::coin;
//     use aptos_framework::aptos_coin::AptosCoin;
//     // use aptos_framework::event;

//     // #[event]
//     // struct PlanOrSponsorEvent has drop, store { marketer: address, amount: u64 }

//     // #[event]
//     // struct RewardPaidEvent has drop, store { marketer: address, reward_pool: u64, campaign_fee: u64 }

//     // #[event]
//     // struct RewardWithdrawnEvent has drop, store { user: address, amount: u64 }

//     // #[event]
//     // struct ContractBalanceEvent has drop, store { amount: u64 }

//     struct State has key {
//         owner: address,
//         reward_pool: coin::Coin<AptosCoin>,
//     }

//     public entry fun init(admin: &signer, owner: address) {
//         let addr = signer::address_of(admin);
//         assert!(!exists<State>(addr), 1);
//         let zero = coin::withdraw<AptosCoin>(admin, 0);
//         move_to(admin, State { owner, reward_pool: zero });
//     }

//     public entry fun plan_and_sponsor(user: &signer, amount: u64) acquires State {
//         // let caller = signer::address_of(user);
//         let coins = coin::withdraw<AptosCoin>(user, amount);

//         let state = borrow_global_mut<State>(signer::address_of(user));
//         coin::deposit<AptosCoin>(state.owner, coins);

//         // event::emit_event<PlanOrSponsorEvent>(PlanOrSponsorEvent { marketer: caller, amount });
//     }

//     public entry fun reward_pool_and_campaign_fee(user: &signer, reward_pool_amt: u64, campaign_fee: u64) acquires State {
//         // let caller = signer::address_of(user);
//         let state = borrow_global_mut<State>(signer::address_of(user));

//         let reward = coin::withdraw<AptosCoin>(user, reward_pool_amt);
//         let fee = coin::withdraw<AptosCoin>(user, campaign_fee);

//         coin::merge(&mut state.reward_pool, reward);
//         coin::deposit<AptosCoin>(state.owner, fee);

//         // event::emit_event<RewardPaidEvent>(RewardPaidEvent { marketer: caller, reward_pool: reward_pool_amt, campaign_fee: campaign_fee });
//     }

//     public entry fun withdraw_rewards(user: &signer, earned_points: u64, fee_percent: u64, admin_addr: address) acquires State {
//         assert!(earned_points >= 10, 2);
//         let _caller = signer::address_of(user);
//         // let state = borrow_global_mut<State>(signer::address_of(user));

//         let state = borrow_global_mut<State>(admin_addr);

//         let reward_amount = earned_points * 1_000_000;
//         let fee = reward_amount * fee_percent / 100;
//         let final_amount = reward_amount - fee;

//         // let coins = coin::extract(&mut state.reward_pool, reward_amount);
//         // let (user_coin, fee_coin) = coin::split(coins, final_amount);

//         // Take final reward for user
//         let user_coin = coin::extract<AptosCoin>(&mut state.reward_pool, final_amount);
//         // Take fee for owner
//         let fee_coin = coin::extract<AptosCoin>(&mut state.reward_pool, fee);

//         coin::deposit<AptosCoin>(_caller, user_coin);
//         coin::deposit<AptosCoin>(state.owner, fee_coin);

//         // event::emit_event<RewardWithdrawnEvent>(RewardWithdrawnEvent { user: caller, amount: final_amount });
//         // event::emit_event<ContractBalanceEvent>(ContractBalanceEvent { amount: coin::value(&state.reward_pool) });
//     }
// }




// module twitter_addr::twitter {

//     use std::signer;
//     // use std::option;
//     use aptos_framework::coin;
//     use aptos_framework::aptos_coin::AptosCoin;
//     // use aptos_framework::event;

//     // #[event]
//     // struct PlanOrSponsorEvent has drop, store { marketer: address, amount: u64 }

//     // #[event]
//     // struct RewardPaidEvent has drop, store { marketer: address, reward_pool: u64, campaign_fee: u64 }

//     // #[event]
//     // struct RewardWithdrawnEvent has drop, store { user: address, amount: u64 }

//     // #[event]
//     // struct ContractBalanceEvent has drop, store { amount: u64 }

//     struct State has key {
//         owner: address,
//         reward_pool: coin::Coin<AptosCoin>,
//     }

//     public entry fun init(admin: &signer) {
//         let addr = signer::address_of(admin);
//         assert!(!exists<State>(addr), 1);
//         let zero = coin::withdraw<AptosCoin>(admin, 0);
//         move_to(admin, State { owner: addr, reward_pool: zero });
//     }

//     public entry fun plan_and_sponsor(user: &signer, amount: u64) acquires State {
//         // let caller = signer::address_of(user);
//         let coins = coin::withdraw<AptosCoin>(user, amount);

//         let state = borrow_global_mut<State>(signer::address_of(user));
//         let owner = state.owner;

//         coin::deposit<AptosCoin>(owner, coins);

//         // event::emit_event<PlanOrSponsorEvent>(PlanOrSponsorEvent { marketer: caller, amount });
//     }

//     public entry fun reward_pool_and_campaign_fee(user: &signer, reward_pool_amt: u64, campaign_fee: u64) acquires State {
//         // let caller = signer::address_of(user);
//         let state = borrow_global_mut<State>(signer::address_of(user));
//         // let state = borrow_global_mut<State>(admin_addr);
//         let owner = state.owner;

//         let reward = coin::withdraw<AptosCoin>(user, reward_pool_amt);
//         let fee = coin::withdraw<AptosCoin>(user, campaign_fee);

//         // store reward into pool
//         coin::merge(&mut state.reward_pool, reward);
//         // send fee to owner
//         coin::deposit<AptosCoin>(owner, fee);

//         // event::emit_event<RewardPaidEvent>(RewardPaidEvent { marketer: caller, reward_pool: reward_pool_amt, campaign_fee: campaign_fee });
//     }

//     public entry fun withdraw_rewards(user: &signer, earned_points: u64, fee_percent: u64) acquires State {
//         assert!(earned_points >= 10, 2);
//         let caller = signer::address_of(user);

//         let state = borrow_global_mut<State>(signer::address_of(admin_addr));
//         let owner = state.owner;

//         let reward_amount = earned_points * 1_000_000;
//         let fee = reward_amount * fee_percent / 100;
//         let final_amount = reward_amount - fee;

//         // let coins = coin::extract(&mut state.reward_pool, reward_amount);
//         // let (user_coin, fee_coin) = coin::split(coins, final_amount);

//         // Take final reward for user
//         let user_coin = coin::extract<AptosCoin>(&mut state.reward_pool, final_amount);
//         // Take fee for owner
//         let fee_coin = coin::extract<AptosCoin>(&mut state.reward_pool, fee);

//         coin::deposit<AptosCoin>(caller, user_coin);
//         coin::deposit<AptosCoin>(owner, fee_coin);

//         // event::emit_event<RewardWithdrawnEvent>(RewardWithdrawnEvent { user: caller, amount: final_amount });
//         // event::emit_event<ContractBalanceEvent>(ContractBalanceEvent { amount: coin::value(&state.reward_pool) });
//     }
// }



module twitter_addr::twitter {
    use std::signer;
    use aptos_framework::coin;
    use aptos_framework::aptos_coin::AptosCoin;

    /// Single, contract-wide state living at `@twitter_addr`
    struct State has key {
        owner: address,                      // admin/fee recipient
        reward_pool: coin::Coin<AptosCoin>,  // pooled APT to pay rewards
    }

    /// Initialize once from the admin (the account at `@twitter_addr`)
    public entry fun init(admin: &signer) {
        let addr = signer::address_of(admin);
        // Ensure the initializer is the module address
        assert!(addr == @twitter_addr, 1);
        // Ensure we don't double-initialize
        assert!(!exists<State>(@twitter_addr), 2);

        let zero = coin::zero<AptosCoin>();
        move_to(admin, State { owner: addr, reward_pool: zero });
    }

    /// User pays `amount` APT directly to the owner (like your Solidity plan/sponsor)
    public entry fun plan_and_sponsor(user: &signer, amount: u64) acquires State {
        let coins = coin::withdraw<AptosCoin>(user, amount);
        let state = borrow_global_mut<State>(@twitter_addr);
        coin::deposit<AptosCoin>(state.owner, coins);
    }

    /// User funds the reward pool and pays a separate campaign fee to owner
    public entry fun reward_pool_and_campaign_fee(
        user: &signer,
        reward_pool_amt: u64,
        campaign_fee: u64
    ) acquires State {
        let state = borrow_global_mut<State>(@twitter_addr);
        let reward = coin::withdraw<AptosCoin>(user, reward_pool_amt);
        let fee = coin::withdraw<AptosCoin>(user, campaign_fee);

        // add to pool
        coin::merge(&mut state.reward_pool, reward);
        // fee to owner
        coin::deposit<AptosCoin>(state.owner, fee);
    }

    /// User claims rewards based on points; a fee % goes to owner
    public entry fun withdraw_rewards(
        user: &signer,
        earned_points: u64,
        fee_percent: u64
    ) acquires State {
        assert!(earned_points >= 10, 3);
        // (optional) guard fee_percent <= 100
        assert!(fee_percent <= 100, 4);

        let caller = signer::address_of(user);
        let state = borrow_global_mut<State>(@twitter_addr);

        // 1 point = 1_000_000 Octas (1e6), matching your Solidity intent
        let reward_amount = earned_points * 1_000_000;
        let fee = reward_amount * fee_percent / 100;
        let final_amount = reward_amount - fee;

        // Ensure pool has enough to cover full reward+fee
        assert!(coin::value(&state.reward_pool) >= reward_amount, 5);

        // Extract for user and fee separately (no coin::split in Aptos)
        let user_coin = coin::extract<AptosCoin>(&mut state.reward_pool, final_amount);
        let fee_coin = coin::extract<AptosCoin>(&mut state.reward_pool, fee);

        coin::deposit<AptosCoin>(caller, user_coin);
        coin::deposit<AptosCoin>(state.owner, fee_coin);
    }
}
