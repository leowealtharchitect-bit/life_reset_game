import React from 'react';
import { GameState, ShieldLevel } from '../types';
import { STAGES } from '../data';

interface PlayScreenProps {
  gameState: GameState;
  onMakeDecision: (decision: ShieldLevel) => void;
  onTriggerLeoTip: () => void;
}

export const PlayScreen: React.FC<PlayScreenProps> = ({
  gameState,
  onMakeDecision,
  onTriggerLeoTip,
}) => {
  const currentStage = STAGES[gameState.currentStageIdx];
  const char = gameState.character;
  if (!char || !currentStage) return null;

  const fiveYearIncome = char.monthlyIncome * 12 * 5;
  const fiveYearExpense = char.monthlyExpense * 12 * 5;

  return (
    <div className="max-w-4xl mx-auto w-full space-y-5 animate-fade-in">
      {/* Character & Game Status Bar */}
      <div className="glass-card p-4 rounded-2xl shadow-lg flex flex-wrap items-center justify-between gap-3 border-amber-500/20">
        <div className="flex items-center space-x-3">
          {char.avatarImage ? (
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md border border-amber-400/50 flex-shrink-0 bg-slate-800">
              <img
                src={char.avatarImage}
                alt={char.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div
              className={`w-10 h-10 rounded-xl bg-gradient-to-tr ${char.avatarBg} text-white flex items-center justify-center text-lg shadow`}
            >
              <i className={`fa-solid ${char.icon}`}></i>
            </div>
          )}
          <div>
            <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
              {char.name}
            </h3>
            <p className="text-[11px] text-amber-600 dark:text-amber-400 font-bold">
              {currentStage.name}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4 sm:space-x-6 text-xs">
          <div>
            <span className="text-slate-400 text-[10px] block font-medium">净储蓄资产</span>
            <span
              className={`font-black text-sm ${
                gameState.savings < 0 ? 'text-rose-500' : 'text-emerald-600 dark:text-emerald-400'
              }`}
            >
              RM {gameState.savings.toLocaleString()}
            </span>
          </div>

          <div>
            <span className="text-slate-400 text-[10px] block font-medium">健康体魄值</span>
            <div className="flex items-center space-x-1.5">
              <span
                className={`font-black text-sm ${
                  gameState.health < 60 ? 'text-rose-500' : 'text-sky-600 dark:text-sky-400'
                }`}
              >
                {gameState.health}
              </span>
              <span className="text-slate-400 text-[10px]">/100</span>
            </div>
          </div>

          <div>
            <span className="text-slate-400 text-[10px] block font-medium">当前防线状态</span>
            <div className="font-bold text-xs">
              {gameState.shieldLevel === 'FULL_SHIELD' ? (
                <span className="text-amber-500">🛡️ 医疗卡 + 30万重疾金</span>
              ) : gameState.shieldLevel === 'MEDICAL_ONLY' ? (
                <span className="text-sky-500">🏥 仅 Medical Card 医疗卡</span>
              ) : (
                <span className="text-rose-500">⚠️ 裸奔无防护</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Stage & Decision Card */}
      <div className="glass-card p-6 rounded-3xl space-y-4 border-2 border-slate-200 dark:border-slate-800 relative overflow-hidden">
        <div className="flex justify-between items-start">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-widest px-3 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full border border-amber-500/20">
              阶段关卡 {gameState.currentStageIdx + 1} / {STAGES.length}
            </span>
            <h3 className="text-xl font-extrabold text-slate-900 dark:text-white mt-2">
              {currentStage.name}
            </h3>
          </div>
          <button
            onClick={onTriggerLeoTip}
            className="text-xs bg-amber-400/10 hover:bg-amber-400/20 text-amber-600 dark:text-amber-400 font-bold px-3 py-1.5 rounded-xl border border-amber-400/30 transition flex items-center space-x-1 cursor-pointer"
          >
            <i className="fa-solid fa-lightbulb"></i>
            <span>LEO 建议</span>
          </button>
        </div>

        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
          {currentStage.desc} 本阶段你预计能创造家庭收入 RM {fiveYearIncome.toLocaleString()}，但房贷与家庭基本开销预计消耗 RM {fiveYearExpense.toLocaleString()}。
        </p>

        {/* 3 Decision Options */}
        <div className="pt-3 border-t border-slate-200 dark:border-slate-800 space-y-3">
          <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-2">
            <i className="fa-solid fa-sliders text-amber-500"></i>
            <span>请制定你在本阶段的【家庭防线与健康策略】：</span>
          </h4>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {/* Option A */}
            <div
              onClick={() => onMakeDecision('NONE')}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-rose-500 transition cursor-pointer flex flex-col justify-between space-y-3 group"
            >
              <div>
                <div className="flex items-center space-x-2 text-rose-500 font-bold text-xs">
                  <i className="fa-solid fa-ban"></i>
                  <span>方案 A：完全裸奔 (零保险)</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-normal">
                  将所有钱留在手里赚利息/投资。保费成本：RM 0/月。如果发生大病，全靠个人储蓄硬扛。
                </p>
              </div>
              <button className="w-full py-2 bg-slate-100 dark:bg-slate-800 group-hover:bg-rose-600 group-hover:text-white text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition cursor-pointer">
                选择零防护
              </button>
            </div>

            {/* Option B */}
            <div
              onClick={() => onMakeDecision('MEDICAL_ONLY')}
              className="p-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 hover:border-sky-500 transition cursor-pointer flex flex-col justify-between space-y-3 group"
            >
              <div>
                <div className="flex items-center space-x-2 text-sky-500 font-bold text-xs">
                  <i className="fa-solid fa-hospital-user"></i>
                  <span>方案 B：仅购买 Medical Card</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 leading-normal">
                  保费约 RM 200/月。能报销医院手术与住院账单，但{' '}
                  <strong className="text-rose-400">不给现金补偿</strong>。
                </p>
              </div>
              <button className="w-full py-2 bg-slate-100 dark:bg-slate-800 group-hover:bg-sky-600 group-hover:text-white text-slate-700 dark:text-slate-300 text-xs font-bold rounded-xl transition cursor-pointer">
                选择基础医疗卡
              </button>
            </div>

            {/* Option C */}
            <div
              onClick={() => onMakeDecision('FULL_SHIELD')}
              className="p-4 rounded-2xl bg-slate-900 border-2 border-amber-500 hover:border-amber-400 transition cursor-pointer flex flex-col justify-between space-y-3 group shadow-xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 bg-amber-500 text-slate-950 font-black text-[9px] px-2.5 py-0.5 rounded-bl-lg">
                LEO 推荐
              </div>
              <div>
                <div className="flex items-center space-x-2 text-amber-400 font-bold text-xs">
                  <i className="fa-solid fa-shield-virus"></i>
                  <span>方案 C：LEO 完整重疾现金防线</span>
                </div>
                <p className="text-[11px] text-slate-300 mt-2 leading-normal">
                  保费约 RM 380/月。拥有 Medical Card +{' '}
                  <strong className="text-amber-300">RM 300,000 一次性重疾理赔金</strong>
                  ，覆盖3~5年停工收入损失。
                </p>
              </div>
              <button className="w-full py-2 bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 text-xs font-extrabold rounded-xl transition shadow cursor-pointer">
                开启全能守护防线
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* History Event Logs */}
      <div className="glass-card p-4 rounded-2xl space-y-2">
        <h4 className="text-xs font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
          <i className="fa-solid fa-clock-rotate-left text-amber-500"></i>
          <span>人生轨迹演变日志：</span>
        </h4>
        <div className="max-h-28 overflow-y-auto space-y-1 text-xs text-slate-600 dark:text-slate-300 pr-2">
          {gameState.historyLogs
            .slice()
            .reverse()
            .map((log, idx) => (
              <div
                key={idx}
                className="p-1.5 rounded bg-slate-100 dark:bg-slate-800/50 border-l-2 border-amber-500 font-mono text-[11px]"
              >
                {log}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
