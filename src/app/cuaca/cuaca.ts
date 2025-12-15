import { AfterViewInit, Component, Renderer2 } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Sidebar } from '../sidebar/sidebar';
import { Header } from '../header/header';
import { Footer } from '../footer/footer';

declare const $: any;
declare const moment: any;

@Component({
  selector: 'app-cuaca',
  standalone: true,
  imports: [RouterModule, Sidebar, Header, Footer],
  templateUrl: './cuaca.html',
  styleUrl: './cuaca.css',
})
export class Cuaca implements AfterViewInit {
  private table1: any;
  private readonly defaultCity = 'pontianak';

  constructor(private renderer: Renderer2, private http: HttpClient) {
    this.renderer.removeClass(document.body, 'sidebar-open');
    this.renderer.addClass(document.body, 'sidebar-closed');
  }

  ngAfterViewInit(): void {
    if (typeof $ === 'undefined' || typeof moment === 'undefined') {
      console.warn('Cuaca component requires jQuery DataTables and moment.js.');
      return;
    }

    this.table1 = $('#table1').DataTable({
      columnDefs: [
        {
          targets: 0,
          render: (data: string) => {
            if (!data) {
              return '';
            }

            const waktu = moment(data + ' UTC');
            return (
              waktu.local().format('YYYY-MM-DD') +
              '<br />' +
              waktu.local().format('HH:mm') +
              ' WIB'
            );
          },
        },
        {
          targets: 1,
          render: (data: string) =>
            "<img src='" +
            data +
            "' style='filter: drop-shadow(5px 5px 10px rgba(0, 0, 0, 0.7));' />",
        },
        {
          targets: 2,
          render: (data: string) => {
            if (!data) {
              return '';
            }

            const array = data.split('||');
            const cuaca = (array[0] || '').trim();
            const description = (array[1] || '').trim();
            return '<strong>' + cuaca + '</strong> <br /> ' + description;
          },
        },
      ],
    });

    this.getData(this.defaultCity);
  }

  handleEnter(event: any): void {
    if (!this.table1) {
      return;
    }

    const cityName = (event.target?.value || '').trim();

    if (cityName === '') {
      this.table1.clear();
      this.table1.draw(false);
      return;
    }

    this.getData(cityName);
  }

  getData(city: string): void {
    const encodedCity = encodeURIComponent(city);
    const url = `http://api.openweathermap.org/data/2.5/forecast?q=${encodedCity}&appid=380a9e80e46a5d7e35e8bcba59b3e7ee`;

    this.http.get(url).subscribe(
      (data: any) => {
        if (!this.table1) {
          return;
        }

        const list = data?.list || [];
        this.table1.clear();

        list.forEach((element: any) => {
          const weather = element.weather[0];
          const iconUrl =
            'https://openweathermap.org/img/wn/' + weather.icon + '@2x.png';
          const cuacaDeskripsi = weather.main + ' || ' + weather.description;
          const main = element.main;
          const tempMin = this.kelvinToCelcius(main.temp_min);
          const tempMax = this.kelvinToCelcius(main.temp_max);
          const temp = tempMin + '°C - ' + tempMax + '°C';
          const row = [element.dt_txt, iconUrl, cuacaDeskripsi, temp];

          this.table1.row.add(row);
        });

        this.table1.draw(false);
      },
      (error: any) => {
        if (!this.table1) {
          return;
        }

        alert(error?.error?.message || 'Terjadi kesalahan');
        this.table1.clear();
        this.table1.draw(false);
      }
    );
  }

  kelvinToCelcius(kelvin: number): number {
    const celcius = kelvin - 273.15;
    return Math.round(celcius * 100) / 100;
  }
}
