<script	async script lang="ts">

  import { fixToTwoDigits } from './lib/utilities/functions';
  import {onMount} from 'svelte';
  import icon from './assets/transfer_icon.svg'


  const BASE_URL: string = 'https://open.er-api.com/v6/latest'
  // изначально выбранная основная валюта
  let baseCode: string = "USD";

  // список валют
  let currencies: string[] = [];

  type TRates = {
    [key: string]: number;
  }
  // курсы по валютам
  let rates: TRates;

  // выбранные валюты
  let fromCurrencySelected: string = baseCode;
  let toCurrencySelected: string;

  // флаг отрисовки компонента
  let ready = false;

  // курс по текущей паре валют
  let exchangeRate: number;

  // введенные суммы
  let fromAmount: number = 1;
  $:toAmount = fixToTwoDigits(fromAmount * exchangeRate);
  
  
  const fetchData = async () => {
    let response = await fetch(`${BASE_URL}/${baseCode}`);
    let data = await response.json();
   
    for (let key in data.rates) {
      currencies.push(key)    
    }
    rates = data.rates;
    
    const firstCurrency = Object.keys(data.rates)[1];
    toCurrencySelected = !toCurrencySelected ? firstCurrency : toCurrencySelected;
    exchangeRate = data.rates[toCurrencySelected];
      
    ready = true;
  }

  onMount(() => {
    fetchData();
  });


  const handleSecondInput = () => {
    fromAmount = fixToTwoDigits(toAmount / exchangeRate);
  }

  const handleFirstSelect = () => {
    baseCode = fromCurrencySelected;
    fetchData();
  }

  const handleSecondSelect = () => {
    exchangeRate = rates[toCurrencySelected];
  }

</script>

<main>
  <h1>Currency converter</h1>
  <div class="converter">
    <div>
    <input type="number" bind:value={fromAmount} />
    <select bind:value={fromCurrencySelected} on:change={handleFirstSelect}>
    {#if ready}
      {#each currencies as currency}
			<option value={currency}>
				{currency}
			</option>
		{/each}
    {/if}
  </select>
  </div>
  <div class="equal">
    <img src={icon} alt="Transfer icon">
  </div>
  <div>
    <input type="number" bind:value={toAmount} on:input={handleSecondInput}/>
    <select bind:value={toCurrencySelected} on:change={handleSecondSelect}>
    {#if ready}
      {#each currencies as currency}
			<option value={currency}>
				{currency}
			</option>
		{/each}
    {/if}
    </select>
  </div>
  </div>
</main>

<style>

</style>
