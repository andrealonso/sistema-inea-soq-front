import moment from 'moment'

export default (context, inject) => {
    inject('moment', moment)
    inject('dataValida', (data) => {
        return moment(data, 'YYYY-MM-DD', true).isValid()
    })
    inject('formatData', (data) => {
        if (moment(data, 'YYYY-MM-DD').isValid()) {
            return moment(data).format('DD/MM/YYYY')
        } else {
            return ''
        }
    })
}