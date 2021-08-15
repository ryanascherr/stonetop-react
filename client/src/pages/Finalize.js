import React from 'react';
import $ from 'jquery';
import QueryPlaybook from '../components/QueryPlaybook';
import QueryBackground from '../components/QueryBackground';
import QueryDrive from '../components/QueryDrive';

export default function Finalize() {

  let playbook = localStorage.getItem('playbook');
  let background = localStorage.getItem('background');
  let drive = localStorage.getItem('drive');
  let origin = localStorage.getItem('origin');
  let name = localStorage.getItem('name');
  let str = localStorage.getItem('str');
  let dex = localStorage.getItem('dex');
  let int = localStorage.getItem('int');
  let wis = localStorage.getItem('wis');
  let con = localStorage.getItem('con');
  let cha = localStorage.getItem('cha');

  $(document).ready(function () {
    if (!playbook || !background || !drive || !origin || !str) {
      $(".finalize-title").text("Make sure to choose a playbook, background, drive, origin, name, and stats!");
    } else {
      $(".finalize-title").text("Review the information below and finalize your character when you're ready!");
      $(".character-review").removeClass("hidden");
    }
  })

  return (
    <div className="content">
      <h2 className="finalize-title"> </h2>
      <div className="character-review hidden">
        <h2>Name: {name}</h2>
        <h2>Origin: {origin}</h2>
        <h2>Playbook:</h2>
        <QueryPlaybook></QueryPlaybook>
        <h2>Background:</h2>
        <QueryBackground></QueryBackground>
        <h2>Drive:</h2>
        <QueryDrive></QueryDrive>
        <div className="stat-container">
          <div className="stat">
            <h2>Strength: {str}</h2>
          </div>
          <div className="stat">
            <h2>Dexterity: {dex}</h2>
          </div>
          <div className="stat">
            <h2>Intelligence: {int}</h2>
          </div>
          <div className="stat">
            <h2>Wisdom: {wis}</h2>
          </div>
          <div className="stat">
            <h2>Constitution: {con}</h2>
          </div>
          <div className="stat">
            <h2>Charisma: {cha}</h2>
          </div>
        </div>
        <div className="btn-container">
          <button className="finalize-btn">Create Your Character</button>
        </div>
      </div>
    </div>
  );
}