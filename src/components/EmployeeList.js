import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import { employeesFetch } from '../actions';
import ListItem from './ListItem';

class EmployeeList extends Component {
	componentWillMount() {
		this.props.employeesFetch();

		this.createDataSource(this.props);
	}

	//get called with new state of app
	componentWillReceiveProps(nextProps) {
		//nextProps are the next set of props that this component
		//will be rendered with
		//this.props is still the old set of props
		this.createDataSource(nextProps);
	}

	createDataSource({ employees }) {
		const ds = new ListView.DataSource({
			rowHasChanged: (r1, r2) => r1 !== r2
		});

		this.dataSource = ds.cloneWithRows(employees);
	}

	renderRow(data) {
		return <ListItem eple={data} />;
	}

	render() {
		return (
			<ListView
				enableEmptySections
				dataSource={this.dataSource}
				renderRow={this.renderRow}
			/>
		);
	}
}

const mapStateToProps = state => {
	//map will push all objects into an array
	const employees = _.map(state.employees, (val, uid) => {
		return { ...val, uid };
	});

	return { employees };
};

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
