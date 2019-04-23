import 'babel-polyfill'; // eslint-disable-line import/no-unassigned-import
import escapeHTML from 'escape-html';
import {version} from '../package';
import getCoinData from './get-coin-data';
import getCoinName from './get-coin-name';
import formatSeconds from './format-seconds';

document.querySelector('.version').innerText = `v${version}`;

getCoinData().then(coins => {
	const table = document.querySelector('table.results');

	table.innerHTML = `
		<thead>
			<td>Name</td>
			<td>Market Cap</td>
			<td>Proof-of-Work</td>
			<td>Equivalent Confs</td>
			<td>Estimated Time</td>
			<td>Speed</td>
		</thead>
		<tbody>
			${coins.map(coin => `
			<tr>
				<td>${escapeHTML(`${getCoinName(coin)} (${coin.symbol})`)}</td>
				<td>${escapeHTML(coin.marketCapFormatted || 'Unknown')}</td>
				<td>${escapeHTML(`${coin.algorithm} @ ${coin.hashRateFormatted}`)}</td>
				<td>${escapeHTML(coin.confirmations.toLocaleString())} confs</td>
				<td>${escapeHTML(formatSeconds(coin.estimatedTimeForConfs))}</td>
				<td>${coin.symbol === 'BTC' ? '-' : `${escapeHTML(Math.round(coin.multiplier))}x slower`}</td>
			</tr>
			`).join('')}
		</tbody>
	`;
});
