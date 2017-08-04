import { Template, forEach } from '@gaws/html'
import { Iterator } from '@gaws/core'
import template from './template.html'
import styles from './styles.css'

function main() {
    const hasConversions = new Iterator({
        entity: AdWordsApp.adGroups(),
        conditions: ['Conversions > 0'],
        dateRange: 'LAST_7_DAYS'
    }).map(group => {
        const stats = group.getStatsFor('LAST_7_DAYS')
        return forEach([ group.getName(), stats.getConversions(), stats.getClicks(), stats.getImpressions() ], 'td')
    })
    const test = new Template(template)
    const html = test.parse({
        style: styles,
        rows: forEach(hasConversions, 'tr', { class: 'table-item' })
    })
    
    MailApp.sendEmail({
        to: 'jfaircloth@cocg.co',
        subject: 'testing',
        htmlBody: html
    })
}
main() 