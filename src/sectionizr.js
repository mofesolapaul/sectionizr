/**
 * Tool for controlling sectionizrs in the DOM
 */

$.fn.sectionize = $.fn.sectionizr = function () {
    let guys = []
    $(this).each((i, el) => {
        if (el.sectionizr) {
            // do not re-initialize, just refresh
            el
                .sectionizr
                .refresh()
            return
        }
        el.sectionizr = new(function () {
            let snzr = this

            // private
            let isVertical = false

            // props
            snzr.el = el
            snzr.sections = []
            snzr.position = 1

            // behaviours
            snzr.next = () => {
                if (!snzr.hasNext()) 
                    return false
                return offset()
            }
            snzr.prev = () => {
                if (!snzr.hasPrev()) 
                    return false
                return offset(false)
            }
            snzr.step = step => {
                snzr.position += step
                snzr.position = snzr.position < 1
                    ? 1
                    : (snzr.position > snzr.sections.length
                        ? snzr.sections.length
                        : snzr.position)
                offset(null)
            }
            snzr.go = where => {
                snzr.position = where
                snzr.position = snzr.position < 1
                    ? 1
                    : (snzr.position > snzr.sections.length
                        ? snzr.sections.length
                        : snzr.position)
                offset(null)
            }
            snzr.first = () => {
                snzr.position = 1
                offset(null)
            }
            snzr.last = () => {
                snzr.position = snzr.sections.length
                offset(null)
            }
            snzr.hasNext = () => snzr.position < snzr.sections.length
            snzr.hasPrev = () => snzr.position > 1
            snzr.refresh = init

            // local
            function offset(forward = true) {
                (forward === true
                    ? snzr.position ++: (forward === false
                        ? snzr.position--
                        : null))
                let _prop = isVertical
                    ? 'marginTop'
                    : 'marginLeft'
                let _offset = `-${ (snzr.position - 1) * (isVertical
                    ? snzr.sections[0].clientHeight
                    : 100)}${isVertical
                    ? 'px'
                    : '%'}`
                $(snzr.sections[0]).css({[_prop]: _offset})
                return true
            }
            function init() {
                isVertical = $(snzr.el).hasClass('vertical')
                snzr.sections.length = 0
                $('>section', $(snzr.el)).each((i, s) => snzr.sections.push(s))
            }

            // init
            init()
        })()
        guys.push(el.sectionizr)
    })
    return guys.length == 1
        ? guys[0]
        : guys
}
if (typeof module != 'undefined' && module.exports) 
    module.exports = {}