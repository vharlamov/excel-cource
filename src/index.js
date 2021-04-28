import './scss/index.scss'
import {Excel} from './components/excel/Excel'
import {Toolbar} from './components/toolbar/Toolbar'
import {Header} from './components/header/Header'
import {Formula} from './components/formula/Formula'
import {Table} from './components/table/Table'
import { createStore } from './core/createStore'
import { rootReduser } from './redux/rootReduser'
import { debounce, storage } from './core/utils'

const store = createStore(rootReduser, storage('excel-state'))

const stateListener = debounce(state => {
  storage('excel-state', state)
}, 500)

store.subscribe(stateListener)

const excel = new Excel('#app', {
  components: [
    Header,
    Toolbar,
    Formula,
    Table
  ],
  store
})

excel.render()

