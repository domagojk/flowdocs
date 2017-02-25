import React from 'react'
import { sourceTypes } from 'recyclejs'

function RepoList () {
  return {
    sourceTypes: {
      repos$: sourceTypes.stream.isRequired,
      addRepoRequests$: sourceTypes.stream.isRequired,
      requestDocument: sourceTypes.func.isRequired,
      addRepo: sourceTypes.func.isRequired
    },

    initialState: {
      newRepoInput: '',
      repos: []
    },

    actions (sources) {
      return [
        sources.select('button')
          .on('click')
          .map(sources.requestDocument),

        sources.select('input')
          .on('keyPress')
          .filter(e => e.key === 'Enter')
          .mapToLatest(sources.state)
          .map(s => s.newRepoInput)
          .map(sources.addRepo)
      ]
    },

    reducers (sources) {
      return [
        sources.repos$
          .reducer(function (state, repos) {
            state.repos = repos
            state.newRepoInput = ''
            return state
          }),

        sources.select('input')
          .on('change')
          .reducer(function (state, e) {
            state.newRepoInput = e.target.value
            return state
          }),

        sources.select('input')
          .on('keyPress')
          .filter(e => e.key === 'Enter')
          .reducer(function (state) {
            state.newRepoInput = ''
            return state
          })
      ]
    },

    view (props, state) {
      return (
        <ul>
          {state.repos.map(repo => (
            <li key={repo}>{repo} <button return={repo}>load</button></li>
          ))}
          <li><input placeholder='Add' value={state.newRepoInput} /></li>
        </ul>
      )
    }
  }
}

export default RepoList