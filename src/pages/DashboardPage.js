import { Page } from "../core/Page"
import {$} from '@core/dom'
import { createRecords } from "./dasboard.functions"

export class DashboardPage extends Page {
    getDate() {
        return Date.now().toString()
    }

    getRoot() {
        return $.create('div', 'db')
            .html(`<div class="db__header"> 
            <h1>Панель управления</h1>
        </div>
    
        <div class="db__new">
            <div class="db__view">
                <a href="#excel/${this.getDate()}" class="db__create">
                    Новая <br> таблица
                </a>
            </div>
        </div>
        
        <div class="db__tables db__view">

            <div class="db__list-header">
                <span>Название</span>
                <span><span>Дата открытия</span>
                &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp
                <span>Дата создания</span></span>
            </div>

            <ul class="db__list">
                ${createRecords()}
            </ul>
        </div>`
        )
    }

    afterRender() {}
}
