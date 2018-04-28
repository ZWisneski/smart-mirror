# Module: Crypto Prices
The `crypto` module is a custom module built into the defaults for MagicMirror.
This module displays the configured cryptocurrency symbols and prices, and are updated based on users configuration. Because crypto icons can be any color meaning not all display on the black background, you have to specify the icon urls necessary to ensure a clean look up to your standards.

<img src="/docs/smart-mirror-crypto.png" style="margin: 0 auto; display: block;" width="40%" />

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
	{
		module: 'crypto',
		header: 'Cryptocurrency Market',
		position: 'top_right', // This can be in any location. Best is left or right layouts.
		config: {
			cryptos: [
				{
					code: 'BTC',
					displayName: 'Bitcoin',
					iconUrl: 'https://coinwink.com/coins/128x128/bitcoin.png'
				},
				{
					code: 'ETH',
					displayName: 'Ethereum',
					iconUrl: 'https://coinwink.com/coins/128x128/ethereum.png'
				},
				{
					code: 'PLR',
					displayName: 'Pillar',
					iconUrl: 'https://pillarproject.io/wp-content/uploads/2018/02/pillarproject.jpg'
				},
				{
					code: 'PPP',
					displayName: 'PayPie',
					iconUrl: 'https://coinwink.com/coins/128x128/paypie.png'
				}
				...
			],
			price: 'USD',
			updateInterval: 30000, // every 30 seconds
			animationSpeed: 0,
			url: 'https://min-api.cryptocompare.com/data/pricemulti?'
		}
	}
]
````

## Configuration options

The following properties can be configured:


<table width="100%">
	<!-- why, markdown... -->
	<thead>
		<tr>
			<th>Option</th>
			<th width="100%">Description</th>
		</tr>
	<thead>
	<tbody>
		<tr>
			<td><code>header</code></td>
			<td>The header of the crypto module section that will be displayed<br>
				<br><b>Example:</b>
				<code>Cryptocurrency Market</code>
			</td>
		</tr>
		<tr>
			<td><code>position</code></td>
			<td>The location in which the module will be displayed. The best locations are on the left or the right side of the mirror.<br>
				<br><b>Example:</b>
				<code>top_left</code>
				<strong>Note:</strong> Required.
			</td>
		</tr>
		<tr>
			<td><code>cryptos</code></td>
			<td>A list of the cryptocurrencies that would like to be shown. The cryptocurrency code, the name you would like to be display (could be it's symbol "BTC" instead of its name "Bitcoin"), as well as a link to it's icon.<br>
				<br><b>Example:</b>
				<code>
					[
					  {
							code: 'BTC', displayName: 'Bitcoin', iconUrl: 'https://coinwink.com/coins/128x128/bitcoin.png'
						}
					]
				</code>
				<br><b>Default value:</b> <code>[]</code><br><br>
				<strong>Note:</strong> The application with not function properly if any of the values are incorrect.
			</td>
		</tr>
		<tr>
			<td><code>price</code></td>
			<td>The currency that the cryptocurrency will be priced in.<br>
				<br><b>Example:</b>
				<code>USD</code>
				<br><b>Default value:</b> <code>USD</code><br><br>
			</td>
		</tr>
		<tr>
			<td><code>updateInterval</code></td>
			<td>The amount of time between price refreshes. Timed in milliseconds (30000 is equal to 30 seconds).<br>
				<br><b>Example:</b>
				<code>
					50000
				</code>
				<br><b>Default value:</b> <code>30000</code><br><br>
			</td>
		</tr>
	</tbody>
</table>
