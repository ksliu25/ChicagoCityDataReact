import React, { Component } from 'react';
import { Container, Header, Input, Table } from 'semantic-ui-react';
import axios from 'axios';
import _ from 'lodash';
import ChicagoRow from './ChicagoRow';
import SearchYear from './SearchYear';


const runQuery = 'https://data.cityofchicago.org/resource/rjgc-4h37.json?$order=amount DESC&$limit=10&check_date=';


class ChicagoTable extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: [],
			year: 2011
		};
		this.searchChicago(2015);
	}
	searchChicago(year) {
		axios.get(runQuery + year, ).then(data => {

			const uploadedChicago = data.data;

			let updatedData = Object.assign([], this.state.list);
				updatedData.push(uploadedChicago);

			this.setState({
				list: uploadedChicago,
				year: year
			});
		});
	}

	render() {
		const searchChicago = _.debounce((term) => { this.searchChicago(term) }, 50);
		return (
			<Container text>
				<h1> Search Year : 
					<SearchYear onSearchYearChange={searchChicago} />
				</h1>
				<Header as='h2'> TOP VENDORS OF {this.state.year}</Header>
				<Table celled fixed singleLine>
				    <Table.Header>
				      <Table.Row>
				        <Table.HeaderCell>#Number</Table.HeaderCell>
				        <Table.HeaderCell>Company</Table.HeaderCell>
				        <Table.HeaderCell>Amount</Table.HeaderCell>
				      </Table.Row>
				    </Table.Header>

				    <Table.Body>
				    	{this.state.list.map(function(entry, i) {
				    		return (
				    			<ChicagoRow key={i} id={ i + 1 } chicagoData={entry} />
				    		);
				    	})}
				    </Table.Body>
				</Table>
			</Container>
		)
	}
};

export default ChicagoTable;