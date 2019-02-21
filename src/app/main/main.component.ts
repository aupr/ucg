import { Component, OnInit } from '@angular/core';
import {PreviewDialogComponent} from '../preview-dialog/preview-dialog.component';
import {MatDialog, MatSnackBar} from '@angular/material';
import {GenerateDialogComponent} from '../generate-dialog/generate-dialog.component';
import {GenerateData} from '../plainObject/GenerateData';
import {PreviewData} from '../plainObject/PreviewData';
import {SeparatorData} from '../plainObject/SeparatorData';
import {CodeData} from '../plainObject/CodeData';
import {ApiService} from '../api.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  finalCodeLength = 0;
  execTime = 0;

  // separator data
  separatorDataArray: SeparatorData[] = [];

  // code data
  codeData: CodeData = {
    codeType: 'alphanumeric',
    caseType: 'both',
    includeChars: '@*#(){}^&',
    excludeChars: '01loOjixz',
    codeLength: 16,
    codePrefix: '',
    codeSuffix: '',
    separator: this.separatorDataArray,
    headerText: '<header for upper level program use>\n',
    footerText: '<footer for upper level program use>'
  };

  // preview parameters
  previewData: PreviewData = {
    codeData: this.codeData,
    numberOfCodePreview: 1000
  };

  // generate parameters
  generateData: GenerateData = {
    codeData: this.codeData,
    numberOfCodeGenerate: 10000,
    fileName: 'unique-code-',
    numberOfFile: 10,
    fileExtension: 'txt',
    fileNumberStart: 10,
    fileNumberWith: 'fileName'
  };


  constructor(
    public dialog: MatDialog,
    private snackBar: MatSnackBar,
    private apiService: ApiService
    ) { }

  previewCode: string;

  ngOnInit() {
    this.previewCode = '67s8yfujdgihdskg\nasfhawe48t4ahjkhf\nfa7sefp8ae4gtdgh';
  }

  addSeparator(): void {
    const separatorData: SeparatorData = {
      position: 0,
      symbol: '-'
    };
    this.codeData.separator.push(separatorData);
  }

  deleteSeparator(separatorData: SeparatorData): void {
    this.codeData.separator = this.codeData.separator.filter(sda => sda !== separatorData);
  }

  wordCount(text: string): number {
    const s = text ? text.split(/\s+/) : ['', '']; // it splits the text on space/tab/enter
    const l = s[s.length - 1] ? s.length : s.length - 1;
    return s[0] ? l : l - 1;
  }

  lineCount(text: string): number {
    return text.split(/\r|\r\n|\n/).length;
  }

  crCount(text: string): number {
    // return text.split(/\r|\r\n|\n/).length;
    return text.split(/\r/).length - 1;
  }

  lfCount(text: string): number {
    return text.split(/\n/).length - 1;
  }

  copyPreviewText(inputElement): void {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    // copy success snakebar
    this.snackBar.open('Copied to clipboard!', 'Okay', {
      duration: 2000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });
  }

  erasePreviewText(): void {
    let previewCodeUndoHolder = this.previewCode;
    this.previewCode = '';
    const snakeBarRef = this.snackBar.open('Content Erased!', 'Undo', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom'
    });

    snakeBarRef.onAction().subscribe(() => {
      this.previewCode = previewCodeUndoHolder;
    });

    snakeBarRef.afterDismissed().subscribe(() => {
      previewCodeUndoHolder = '';
    });
  }

  openPreviewDialog(): void {
    const dialogRef = this.dialog.open(PreviewDialogComponent, {
      width: '350px',
      panelClass: 'previewModal',
      data: this.previewData
    });
    dialogRef.afterClosed().subscribe(result => {
      if (typeof result === 'undefined') {
        console.log('The dialog was closed');
      } else {
        this.takePreviewData(result);
        console.log(result);
      }
    });
  }

  openGenerateDialog(): void {
    const dialogRef = this.dialog.open(GenerateDialogComponent, {
      width: '650px',
      panelClass: 'generateModal',
      data: this.generateData
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  takePreviewData(previewData: PreviewData): void {
    this.finalCodeLength = 0;
    this.apiService.takePreviewData(previewData).subscribe(result => {
      this.finalCodeLength = result.finalCodeLength;
      this.execTime = result.execTime;
      let codeString = result.headerText;
      result.codes.forEach(function (val) {
        codeString += val + '\n';
      });
      codeString += result.footerText;
      // this.previewCode = JSON.stringify(result.code);
      this.previewCode = codeString;
    });
  }
}
