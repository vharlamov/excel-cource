import { Page } from "../core/Page"
import {Excel} from '../components/excel/Excel'
import {Toolbar} from '../components/toolbar/Toolbar'
import {Header} from '../components/header/Header'
import {Formula} from '../components/formula/Formula'
import {Table} from '../components/table/Table'
import { createStore } from '../core/createStore'
import { rootReduser } from '../redux/rootReduser'
import { debounce, storage } from '../core/utils'
import { normalizeState } from "../redux/initialState"
import {storageName} from '../core/utils'

export class ExcelPage extends Page {
    getRoot() {
        const state = storage(storageName(this.params))
        const store = createStore(rootReduser, normalizeState(state))

        const stateListener = debounce(state => {
          storage(storageName(this.params), state)
        }, 300)
        
        store.subscribe(stateListener)
        
        this.excel = new Excel({
          components: [
            Header,
            Toolbar,
            Formula,
            Table
          ],
          store
        })
        
        return this.excel.getRoot() 
    }

    afterRender() {
      this.excel.init(this.params)
    }

    destroy() {
        this.excel.destroy()
    }
}
