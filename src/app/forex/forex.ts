import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Header } from "../header/header";
import { Sidebar } from "../sidebar/sidebar";
import { Footer } from "../footer/footer";

declare var $: any;

@Component({
  selector: 'app-forex',
  standalone: true,
  imports: [HttpClientModule, Header, Sidebar, Footer],
  templateUrl: './forex.html',
  styleUrl: './forex.css',
})
export class Forex implements AfterViewInit {
  private _table1 : any;

  constructor(private renderer: Renderer2, private httpClient: HttpClient) {}

  ngAfterViewInit(): void {
    // These lines appear in the second image snippet
    this.renderer.removeClass(document.body, "sidebar-open");
    this.renderer.addClass(document.body, "sidebar-closed");
    this.renderer.addClass(document.body, "sidebar-collapsed");

    // This line appears at the top of the first image snippet,
    // assuming it logically follows the previous setup/initialization.
    // It seems to be redundant with one of the lines above, but we include it
    // as it appears in the original code flow visible in the first snippet.
    this.renderer.addClass(document.body, "sidebar-collapsed");

    // The rest of the code is from the first image snippet
    this._table1 = $("#table1").DataTable({
        "columnDefs": [
            {
                "targets": 3,
                "className": "text-right"
            }
        ]
    });

    this.bindTable1();
}

bindTable1(): void {
    console.log("bindTable1()");

    // URL to fetch exchange rates (from the previous snippet)
    const ratesUrl = "https://openexchangerates.org/api/latest.json?app_id=f7939871cff34aebb605f26dbfcc95f5";
    // URL to fetch currency names
    const currenciesUrl = "https://openexchangerates.org/api/currencies.json";

    // Fetch the currency names
    this.httpClient.get(currenciesUrl).subscribe((currencies: any) => {
        // Fetch the exchange rates
        this.httpClient.get(ratesUrl).subscribe((data: any) => {
            // Update the display with the date of the rates
            $("#tanggal").html("Data per tanggal " + this.formatDate(new Date(data.timestamp * 1000)));

            const rates = data.rates;
            let index = 1;

            // Iterate over the rates and add the rows to the table
            for (const currency in rates) {
                // Get the currency name from the API
                const currencyName = currencies[currency];

                // Calculate the rate for the specific currency
                // Assuming the base currency is USD (default for openexchangerates)
                // and the target is IDR, so this calculates IDR per 1 unit of 'currency'.
                const rate = rates.IDR / rates[currency];

                // Format the calculated rate for display
                const formatRate = this.formatCurrency(rate, "en-US", "", currency);

                console.log(`${currency}: ${currencyName} - ${formatRate}`);

                // Add the row with the index, symbol, currency name, and formatted rate
                const row = [index++, currency, currencyName, formatRate];
                this._table1.row.add(row);
            }

            // Redraw the DataTable to show the newly added rows
            this._table1.draw(false);
        });
    });
}

formatDate(date: Date): string {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric', month: 'long', day: 'numeric'
    };
    return date.toLocaleDateString('id-ID', options);
}

formatCurrency(value: number, locale: string, _currencySymbol: string, currencyCode: string): string {
    return new Intl.NumberFormat(locale, {
        style: 'decimal',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(value);
}
}
