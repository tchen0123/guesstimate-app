import React, {Component, PropTypes} from 'react'
import {connect} from 'react-redux'

import * as organizationActions from 'gModules/organizations/actions'
import {findFacts} from 'gEngine/organization.js'

import {FactList} from '../list/list.js'

function mapStateToProps(state) {
  return {
    organizations: state.organizations,
    organizationFacts: state.facts.organizationFacts,
  }
}

@connect(mapStateToProps)
export class FactSidebarContainer extends Component{
  displayName: 'FactListContainer'

  render() {
    const {organizationId, organizations, organizationFacts, isEditable, spaceId, imported_fact_ids} = this.props
    const facts = findFacts(organizationId, organizationFacts)
    const organization = organizations.find(u => u.id.toString() === organizationId.toString())
    return (
      <FactList
        onDeleteFact={fact => this.props.dispatch(organizationActions.deleteFact(organization, fact))}
        onAddFact={fact => this.props.dispatch(organizationActions.addFact(organization, fact))}
        onEditFact={fact => this.props.dispatch(organizationActions.editFact(organization, fact, true))}
        facts={facts}
        isEditable={isEditable}
        spaceId={spaceId}
        imported_fact_ids={imported_fact_ids}
      />
    )
  }
}
