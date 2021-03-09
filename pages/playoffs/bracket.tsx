import React from 'react';
import Header from '../../components/Header';

export default function PlayoffBracket() {
    return (
        <div className="bg-tile-background bg-repeat min-h-screen overflow-x-auto flex flex-col">
            <Header title="Super Mario Sunshine Bingo league - Bracket" />
            <main className="text-white flex-1 flex flex-col">
                <iframe
                    className="h-full w-full flex-1"
                    src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQ0kkj-wvaDiZ40vqqZcE9_YMxHs3DTNjOKo8Eo7vcvSE6VxnHzU-aQ5AHIunXImErgI2m4cc5Gfukc/pubhtml?gid=494460455&amp;single=true&amp;widget=true&amp;headers=false"></iframe>
            </main>
        </div>
    );
}
