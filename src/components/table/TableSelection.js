import {$} from '@core/dom'

export function toSelect($root, event) {
    const $target = event.target
    const $parent = $target.parentElement
    const type = event.type
    const cellIndex = $target.dataset.index
    const rowIndex = $target.parentElement.dataset.rowindex

    if (type === 'click') {
        select()
    } else if (type === 'keydown') {
        const keyDir = event.key
        shift(keyDir)
    }
    
    function select() {
        if ($('.selected').$el) {
        $('.selected').$el.classList.remove('selected')
        }

        $target.classList.add('selected')
    }

    function shift(keyDir) {
        if ($('.selected').$el) {
        $('.selected').$el.classList.remove('selected')
        }

        let $newTarget = null
        let $newRow = null
        let $newCell = null

        switch (keyDir) {
            case 'ArrowUp':
                $newRow = $(`[data-rowindex="${+rowIndex - 1}"]`)
                if ($newRow.$el) {
                    $newTarget = 
                    $newRow.$el.querySelector(`[data-index="${cellIndex}"]`)
                    changeFocus()
                }
                break 

            case 'ArrowDown':
                $newRow = $(`[data-rowindex="${+rowIndex + 1}"]`)
                if ($newRow.$el) {
                    $newTarget = 
                    $newRow.$el.querySelector(`[data-index="${cellIndex}"]`)
                    changeFocus()
                }
                break

            case 'ArrowLeft':
                $newCell = $(`[data-index="${+cellIndex - 1}"]`)
                if ($newCell.$el) {
                    $newTarget = 
                    $parent.querySelector(`[data-index="${+cellIndex - 1}"]`)
                    changeFocus()
                }
                break

            case 'ArrowRight':
                $newCell = $(`[data-index="${+cellIndex + 1}"]`)
                if ($newCell.$el) {
                    $newTarget = 
                    $parent.querySelector(`[data-index="${+cellIndex + 1}"]`)
                    changeFocus()
                }
                break
        }

        function changeFocus() {
            $newTarget.focus()
            $newTarget.classList.add('selected')
        }
}
}

