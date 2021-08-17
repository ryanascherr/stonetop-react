import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_CHARACTER } from '../utils/queries';
import $ from 'jquery';
import icon from '../img/icon-heavy.png';

const CharacterSheet = () => {

    let result;
    let damage;
    let roll1;
    let roll2;

    $(document).ready(function () {
        $(".damage-btn").click(function () {
            damage = $(this).data("damage");
            damageRoll(damage);
            $(".success-level").text("");
            $(".roll-result").text(`Damage: ${result}`);
            window.scrollTo({
                top: 1000,
                behavior: 'smooth',
              })
        })
    })

    function damageRoll(damage) {
        result = Math.floor(Math.random() * damage) + 1;
    }

    $(document).ready(function () {
        $(".stat-btn").click(function () {
            let number = $(this).data("number");
            let stat = $(this).data("stat");
            statRoll(number);
            if (result > 9) {
                $(".success-level").removeClass("red");
                $(".success-level").removeClass("blue");
                $(".success-level").addClass("green");
                $(".success-level").text("Full Success!");
            } else if (result > 6) {
                $(".success-level").removeClass("red");
                $(".success-level").removeClass("green");
                $(".success-level").addClass("blue");
                $(".success-level").text("Partial Success!");
            } else {
                $(".success-level").removeClass("green");
                $(".success-level").removeClass("blue");
                $(".success-level").addClass("red");
                $(".success-level").text("Failure...Mark Experience!");
            }
            $(".roll-result").text(`${roll1} + ${roll2} + ${stat}(${number}) = ${result}`);
            window.scrollTo({
                top: 1000,
                behavior: 'smooth',
              })
        })
    })

    function statRoll(number) {
        roll1 = Math.floor(Math.random() * 6) + 1;
        roll2 = Math.floor(Math.random() * 6) + 1;
        result = roll1 + roll2 + number;
    }

    $('input[name=weakened]').change(function () {
        if ($(this).is(':checked')) {
            $("#str").addClass("red-background");
            $("#dex").addClass("red-background");
        } else {
            $("#str").removeClass("red-background");
            $("#dex").removeClass("red-background");
        }
    });

    $('input[name=dazed]').change(function () {
        if ($(this).is(':checked')) {
            $("#int").addClass("red-background");
            $("#wis").addClass("red-background");
        } else {
            $("#int").removeClass("red-background");
            $("#wis").removeClass("red-background");
        }
    });

    $('input[name=miserable]').change(function () {
        if ($(this).is(':checked')) {
            $("#con").addClass("red-background");
            $("#cha").addClass("red-background");
        } else {
            $("#con").removeClass("red-background");
            $("#cha").removeClass("red-background");
        }
    });

    let { data } = useQuery(QUERY_CHARACTER, {
        variables: { name: "Murdoc" }
    });

    const currentCharacter = data?.getCharacter || [];

    const listOfCharacters = currentCharacter.map(character => {
        return <div className="" key={character._id}>
            <h1 className="character-sheet-title">{character.name} {character.playbook}</h1>
            <div className="character-sheet-stat-container">
                <div className="two-stats">
                    <div className="character-sheet-stat">
                        <h2 className="stat-number damage-btn" data-damage="6">d6</h2>
                        <h3 className="stat-lower">Damage</h3>
                    </div>
                    <div className="playbook-image-container">
                            <img src={icon} className="playbook-image" alt="Icon"></img>
                    </div>
                    <div className="character-sheet-stat">
                        <h2>18</h2>
                        <h3 className="stat-lower wider">HP (max 18)</h3>
                    </div>
                </div>
                <div className="three-stats">
                    <div className="character-sheet-stat">
                        <h2>1</h2>
                        <h3 className="stat-lower">Armor</h3>
                    </div>
                    <div className="character-sheet-stat">
                        <h2>7</h2>
                        <h3 className="stat-lower">XP</h3>
                    </div>
                    <div className="character-sheet-stat">
                        <h2>2</h2>
                        <h3 className="stat-lower">Level</h3>
                    </div>
                </div>
                <div className="two-stats">
                    <div className="character-sheet-stat">
                        <h3 className="stat-higher">Strength</h3>
                        <h2 className="stat-number stat-btn" data-number={character.str} data-stat="STR" id="str">{character.str}</h2>
                        <h3 className="stat-lower">(STR)</h3>
                    </div>
                    <div className="condition-container">
                        <h3>Weakened</h3>
                        <input type="checkbox" name="weakened" value=""></input>
                    </div>
                    <div className="character-sheet-stat">
                        <h3 className="stat-higher">Dexterity</h3>
                        <h2 className="stat-number stat-btn" data-number={character.dex} data-stat="DEX" id="dex">{character.dex}</h2>
                        <h3 className="stat-lower">(DEX)</h3>
                    </div>
                </div>
                <div className="two-stats">
                    <div className="character-sheet-stat">
                        <h3 className="stat-higher">Intelligence</h3>
                        <h2 className="stat-number stat-btn" data-number={character.int} data-stat="INT" id="int">{character.int}</h2>
                        <h3 className="stat-lower">(INT)</h3>
                    </div>
                    <div className="condition-container">
                        <h3>Dazed</h3>
                        <input type="checkbox" name="dazed" value=""></input>
                    </div>
                    <div className="character-sheet-stat">
                        <h3 className="stat-higher">Wisdom</h3>
                        <h2 className="stat-number stat-btn" data-number={character.wis} data-stat="WIS" id="wis">{character.wis}</h2>
                        <h3 className="stat-lower">(WIS)</h3>
                    </div>
                </div>
                <div className="two-stats">
                    <div className="character-sheet-stat">
                        <h3 className="stat-higher">Constitution</h3>
                        <h2 className="stat-number stat-btn" data-number={character.con} data-stat="CON" id="con">{character.con}</h2>
                        <h3 className="stat-lower">(CON)</h3>
                    </div>
                    <div className="condition-container">
                        <h3>Miserable</h3>
                        <input type="checkbox" name="miserable" value=""></input>
                    </div>
                    <div className="character-sheet-stat">
                        <h3 className="stat-higher">Charisma</h3>
                        <h2 className="stat-number stat-btn" data-number={character.cha} data-stat="CHA" id="cha">{character.cha}</h2>
                        <h3 className="stat-lower">(CHA)</h3>
                    </div>
                </div>
            </div>
        </div>
    })

    return (
        <div className="content">
            {listOfCharacters}
            <div className="roll-container">
                <h2 className="roll-result"> </h2>
                <h2 className="success-level"> </h2>
            </div>
        </div>
    )

}

export default CharacterSheet;