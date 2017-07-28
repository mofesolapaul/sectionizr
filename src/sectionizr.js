/**
 * Tool for controlling sectionizrs in the DOM
 */

if (typeof module != 'undefined' && module.exports) {
    var domtoimage = require('dom-to-image')
    module.exports = {}
}
$.fn.sectionize = $.fn.sectionizr = function () {
    let guys = []
    $(this).each((i, el) => {
        if (el.sectionizr) {
            // do not re-initialize, just refresh
            el
                .sectionizr
                .refresh()
            guys.push(el.sectionizr)
            return
        }
        el.sectionizr = new(function () {
            let snzr = this

            // private
            let isVertical = false
            let isPeek = false

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
                snzr.position = snzr.position < 1 ?
                    1 :
                    (snzr.position > snzr.sections.length ?
                        snzr.sections.length :
                        snzr.position)
                offset(null)
            }
            snzr.go = where => {
                snzr.position = where
                snzr.position = snzr.position < 1 ?
                    1 :
                    (snzr.position > snzr.sections.length ?
                        snzr.sections.length :
                        snzr.position)
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
            snzr.refresh = () => init(true)
            snzr.orientation = () => isVertical ? 'vertical' : 'horizontal'

            // local
            function offset(forward = true) {
                (forward === true ?
                    snzr.position++
                    :
                    (forward === false ?
                        snzr.position--
                        :
                        null))
                let _prop = isVertical ?
                    'marginTop' :
                    'marginLeft'
                let _offset = `-${ (snzr.position - 1) * (isVertical
                    ? snzr.sections[0].clientHeight
                    : 100)}${isVertical
                    ? 'px'
                    : '%'}`
                $(snzr.sections[0]).css({
                    [_prop]: _offset
                })

                // manage visibility : collapsing out-of-view sections keeps them from being
                // tabbed into
                $('.snzr').removeClass('snzr')
                $('.snzr-visible').removeClass('snzr-visible')
                _delay(() => {
                    if (isPeek) $('dom-image').remove()
                    $(snzr.sections[snzr.position - 1]).addClass('snzr-visible')
                    $(snzr.sections).addClass('snzr')
                    if (isPeek) {
                        let peeks = []
                        snzr.position > 1 ? peeks.push(snzr.sections[snzr.position - 2]) : null
                        snzr.position < snzr.sections.length ? peeks.push(snzr.sections[snzr.position]) : null
                        $(peeks).each((i, e) => {
                            $(e).removeClass('snzr')
                            domtoimage.toPng(e, {
                                quality: 0.1
                            }).then(img => {
                                $(e).addClass('snzr')
                                $img = $('<dom-image></dom-image>')
                                $img.css({
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    top: '0',
                                    left: '0',
                                    opacity: '0.3',
                                    backgroundImage: `url(${img})`,
                                    backgroundRepeat: 'no-repeat',
                                })
                                $(e).append($img)
                            })
                        })
                    }
                }, 500)

                return true
            }

            function _delay(cb, d) {
                setTimeout(cb, d)
            }

            function init(refreshing = false) {
                isVertical = $(snzr.el).hasClass('vertical') || $(snzr.el).is('[data-vertical]')
                isPeek = typeof domtoimage != 'undefined' && $(snzr.el).is('[data-peek]')
                snzr.sections.length = 0
                $('>section', $(snzr.el)).each((i, s) => snzr.sections.push(s))
                if (!refreshing)
                    $(snzr.sections).css({
                        marginLeft: 0,
                        marginTop: 0
                    })
                snzr.go(snzr.position)
            }

            // init
            init()
        })()
        guys.push(el.sectionizr)
    })
    return guys.length == 1 ?
        guys[0] :
        guys
}
