import { Component, OnInit } from '@angular/core';
import {ClientService} from '../../services/client.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FlashMessagesService} from 'angular2-flash-messages';
import {Client} from '../../Models/Client';

@Component({
  selector: 'app-client-details',
  templateUrl: './client-details.component.html',
  styleUrls: ['./client-details.component.css']
})
export class ClientDetailsComponent implements OnInit {

  id: string;
  client: Client;
  hasBalance = false;
  showBalanceUpdateInput = false;
  constructor(public clientService: ClientService,
              public router: Router,
              public route: ActivatedRoute,
              public flashMessagesService: FlashMessagesService) { }

  ngOnInit() {
    this.id = this.route.snapshot.params['id'];
    this.clientService.getClient(this.id).subscribe(
      client => {
        if (client.balance > 0) {
          this.hasBalance = true;
        }
        this.client = client;
      }
    );
  }

  updateBalance(id: string) {
    this.clientService.updateClient(this.id, this.client);
    this.flashMessagesService.show('Balance Updated', {cssClass: 'alert-success', timeout: 4000});
    this.router.navigate(['/client/' + this.id]);
  }

  onDeleteClick() {
    if(confirm('Are you sure?')) {
      this.clientService.deleteClient(this.id);
      this.flashMessagesService.show('Client Deleted', {cssClass: 'alert-success', timeout: 4000});
      this.router.navigate(['/']);
    }
  }

}
